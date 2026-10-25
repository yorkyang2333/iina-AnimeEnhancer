// Offscreen test against the same OpenGL/libmpv path used by IINA.
#include <OpenGL/OpenGL.h>
#include <OpenGL/gl3.h>
#include <mpv/client.h>
#include <mpv/render_gl.h>
#include <dlfcn.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

static void *get_proc(void *ctx, const char *name) { return dlsym(RTLD_DEFAULT, name); }
static void check(int code) { if (code < 0) { fprintf(stderr, "mpv: %s\n", mpv_error_string(code)); exit(1); } }
int main(int argc, char **argv) {
    if (argc != 6) { fprintf(stderr,"input shader output width height\n"); return 1; }
    int width = atoi(argv[4]), height = atoi(argv[5]);
    int playback = getenv("AJN_TEST_PLAYBACK") != NULL;
    CGLPixelFormatAttribute attrs[] = { kCGLPFAOpenGLProfile, (CGLPixelFormatAttribute)kCGLOGLPVersion_3_2_Core, kCGLPFAAccelerated, 0 };
    CGLPixelFormatObj pf; GLint count; CGLContextObj gl;
    if (CGLChoosePixelFormat(attrs, &pf, &count) || CGLCreateContext(pf, NULL, &gl)) return 2;
    CGLDestroyPixelFormat(pf); CGLSetCurrentContext(gl);
    printf("GPU: %s\n", glGetString(GL_RENDERER));
    mpv_handle *mpv = mpv_create();
    const char *options[][2] = {{"config","no"},{"vo","libmpv"},{"idle","yes"},{"pause",playback ? "no" : "yes"},{"keep-open","yes"},{"image-display-duration","inf"},{"audio","no"},{"terminal","yes"},{"msg-level","all=warn"},{"fbo-format",getenv("AJN_FBO_FORMAT") ? getenv("AJN_FBO_FORMAT") : "rgba16f"},{"dither-depth","no"},{"scale","bilinear"},{"cscale","bilinear"},{"sigmoid-upscaling","no"},{"gpu-shader-cache","no"}};
    for (int i=0; i<sizeof(options)/sizeof(options[0]); i++) check(mpv_set_option_string(mpv,options[i][0],options[i][1]));
    if (argv[2][0]) check(mpv_set_option_string(mpv,"glsl-shaders",argv[2]));
    check(mpv_initialize(mpv));
    mpv_opengl_init_params init = { get_proc, NULL };
    mpv_render_param params[] = {{MPV_RENDER_PARAM_API_TYPE,MPV_RENDER_API_TYPE_OPENGL},{MPV_RENDER_PARAM_OPENGL_INIT_PARAMS,&init},{0}};
    mpv_render_context *render; check(mpv_render_context_create(&render,mpv,params));
    GLuint tex,fbo;
    glGenTextures(1,&tex); glBindTexture(GL_TEXTURE_2D,tex);
    glTexImage2D(GL_TEXTURE_2D,0,GL_RGBA32F,width,height,0,GL_RGBA,GL_FLOAT,NULL);
    glGenFramebuffers(1,&fbo); glBindFramebuffer(GL_FRAMEBUFFER,fbo);
    glFramebufferTexture2D(GL_FRAMEBUFFER,GL_COLOR_ATTACHMENT0,GL_TEXTURE_2D,tex,0);
    if (glCheckFramebufferStatus(GL_FRAMEBUFFER)!=GL_FRAMEBUFFER_COMPLETE) return 3;
    const char *cmd[] = {"loadfile",argv[1],NULL}; check(mpv_command(mpv,cmd));
    mpv_opengl_fbo target = { fbo,width,height,GL_RGBA32F };
    int flip=0,block=0,frames=0;
    mpv_render_param rp[] = {{MPV_RENDER_PARAM_OPENGL_FBO,&target},{MPV_RENDER_PARAM_FLIP_Y,&flip},{MPV_RENDER_PARAM_BLOCK_FOR_TARGET_TIME,&block},{0}};
    for (int i=0;i<300;i++) {
        mpv_wait_event(mpv,0.01);
        if (mpv_render_context_update(render)&MPV_RENDER_UPDATE_FRAME) {
            check(mpv_render_context_render(render,rp)); glFinish(); frames++;
        }
        if ((playback && frames>=12) || (!playback && frames>1 && i>30)) break;
    }
    glBindFramebuffer(GL_FRAMEBUFFER,fbo);
    float *pixels=malloc(width*height*4*sizeof(float));
    glReadPixels(0,0,width,height,GL_RGBA,GL_FLOAT,pixels);
    FILE *out=fopen(argv[3],"wb"); fwrite(pixels,sizeof(float),width*height*4,out); fclose(out); free(pixels);
    printf("Rendered %d frames, GL error %d\n",frames,glGetError());
    mpv_render_context_free(render); mpv_terminate_destroy(mpv);
    glDeleteFramebuffers(1,&fbo); glDeleteTextures(1,&tex); CGLDestroyContext(gl);
    return frames >= (playback ? 12 : 1) ? 0 : 4;
}
