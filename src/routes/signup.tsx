"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { login, register, setPendingEmail } from "@/lib/auth";

export function AuthPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(
    () => typeof window !== "undefined" && window.location.pathname === "/login",
  );
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    let animationId = 0;
    let renderer: any;
    let geometry: any;
    let material: any;
    let scene: any;
    let camera: any;
    let removeResizeListener: (() => void) | undefined;

    const initThree = (THREE: any) => {
      if (!canvasRef.current || !active) return;

      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        alpha: true,
        antialias: false,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      scene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      const uniforms = {
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2(window.innerWidth * 2, window.innerHeight * 2) },
        u_opacities: { value: [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1.0] },
        u_colors: {
          value: [
            new THREE.Vector3(1, 1, 1),
            new THREE.Vector3(1, 1, 1),
            new THREE.Vector3(1, 1, 1),
            new THREE.Vector3(1, 1, 1),
            new THREE.Vector3(1, 1, 1),
            new THREE.Vector3(1, 1, 1),
          ],
        },
        u_total_size: { value: 20.0 },
        u_dot_size: { value: 6.0 },
      };

      material = new THREE.ShaderMaterial({
        vertexShader: `
          precision mediump float;
          uniform vec2 u_resolution;
          out vec2 fragCoord;
          void main() {
            gl_Position = vec4(position, 1.0);
            fragCoord = (position.xy + 1.0) * 0.5 * u_resolution;
            fragCoord.y = u_resolution.y - fragCoord.y;
          }
        `,
        fragmentShader: `
          precision mediump float;
          in vec2 fragCoord;
          uniform float u_time;
          uniform float u_opacities[10];
          uniform vec3 u_colors[6];
          uniform float u_total_size;
          uniform float u_dot_size;
          uniform vec2 u_resolution;
          out vec4 fragColor;
          float PHI = 1.61803398874989484820459;
          float random(vec2 xy) {
            return fract(tan(distance(xy * PHI, xy) * 0.5) * xy.x);
          }
          void main() {
            vec2 st = fragCoord.xy;
            st.x -= abs(floor((mod(u_resolution.x, u_total_size) - u_dot_size) * 0.5));
            st.y -= abs(floor((mod(u_resolution.y, u_total_size) - u_dot_size) * 0.5));
            float opacity = step(0.0, st.x) * step(0.0, st.y);
            vec2 st2 = vec2(int(st.x / u_total_size), int(st.y / u_total_size));
            float frequency = 5.0;
            float show_offset = random(st2);
            float rand = random(st2 * floor((u_time / frequency) + show_offset + frequency));
            opacity *= u_opacities[int(rand * 10.0)];
            opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.x / u_total_size));
            opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.y / u_total_size));
            vec3 color = u_colors[int(show_offset * 6.0)];
            float dist_from_center = distance(u_resolution / 2.0 / u_total_size, st2);
            float intro = dist_from_center * 0.01 + random(st2) * 0.15;
            opacity *= step(intro, u_time * 3.0);
            fragColor = vec4(color, opacity);
            fragColor.rgb *= fragColor.a;
          }
        `,
        uniforms,
        glslVersion: THREE.GLSL3,
        transparent: true,
      });

      geometry = new THREE.PlaneGeometry(2, 2);
      scene.add(new THREE.Mesh(geometry, material));
      const startTime = performance.now();
      const animate = () => {
        if (!active) return;
        animationId = requestAnimationFrame(animate);
        uniforms.u_time.value = (performance.now() - startTime) / 1000;
        renderer.render(scene, camera);
      };
      animate();

      const handleResize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        uniforms.u_resolution.value.set(window.innerWidth * 2, window.innerHeight * 2);
      };
      window.addEventListener("resize", handleResize);
      removeResizeListener = () => window.removeEventListener("resize", handleResize);
    };

    const loadedThree = (window as Window & { THREE?: any }).THREE;
    if (loadedThree) {
      initThree(loadedThree);
    } else {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
      script.async = true;
      script.onload = () => initThree((window as Window & { THREE?: any }).THREE);
      document.head.appendChild(script);
    }

    return () => {
      active = false;
      cancelAnimationFrame(animationId);
      removeResizeListener?.();
      renderer?.dispose();
      geometry?.dispose();
      material?.dispose();
    };
  }, []);

  const socialButton =
    "flex w-full items-center justify-center gap-2 rounded-md border border-black bg-black px-3 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800";
  const inputClass =
    "w-full rounded-md border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-black outline-none placeholder:text-neutral-500 focus:border-black focus:ring-1 focus:ring-black";

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 py-8 text-white">
      <style>{`
        @keyframes postpuls-dot-drift {
          0% { background-position: 0 0, 0 0, 0 0; opacity: .35; }
          50% { background-position: 18px 12px, -14px 20px, 10px -16px; opacity: .7; }
          100% { background-position: 36px 24px, -28px 40px, 20px -32px; opacity: .35; }
        }
        .postpuls-dot-layer {
          background-image:
            radial-gradient(circle, rgba(255,255,255,.22) 1px, transparent 1.5px),
            radial-gradient(circle, rgba(255,255,255,.14) 1px, transparent 1.5px),
            radial-gradient(circle, rgba(255,255,255,.08) 1px, transparent 1.5px);
          background-size: 22px 22px, 31px 31px, 47px 47px;
          animation: postpuls-dot-drift 12s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .postpuls-dot-layer { animation: none; }
        }
      `}</style>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
      <div className="postpuls-dot-layer pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.25),rgba(0,0,0,0.92))]" />
      <Link
        href="/"
        className="absolute left-6 top-6 z-20 inline-flex items-center rounded-md border border-neutral-700 bg-black/70 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-neutral-400 hover:bg-neutral-900"
      >
        ← Back to PostPuls
      </Link>

      <div className="relative z-10 w-full max-w-[400px] rounded-xl border border-neutral-200 bg-white p-8 text-black shadow-2xl">
        <div className="mx-auto flex w-full max-w-[360px] flex-col items-center text-center">
          <h1 className="text-[1.35rem] font-semibold tracking-tight">
            {isLogin ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-1 text-sm leading-relaxed text-neutral-500">
            {isLogin ? "Sign in to your PostPuls account." : "Sign up to start using PostPuls."}
          </p>

          <form
            onSubmit={async (event) => {
              event.preventDefault();
              setError("");
              const form = new FormData(event.currentTarget);
              const email = String(form.get("email") ?? "");
              const password = String(form.get("password") ?? "");
              try {
                if (isLogin) {
                  await login(email, password);
                  router.push("/dashboard");
                } else {
                  await register(email, password);
                  setPendingEmail(email);
                  router.push("/verify");
                }
              } catch (submissionError) {
                setError(submissionError instanceof Error ? submissionError.message : "Unable to continue.");
              }
            }}
            className="mt-4 flex w-full flex-col gap-2.5"
          >
            {!isLogin && (
              <input name="name" className={inputClass} type="text" placeholder="Full Name" required />
            )}
            <input name="email" className={inputClass} type="email" placeholder="name@work-email.com" required />
            <input name="password" className={inputClass} type="password" placeholder="Password" required />
            {isLogin && (
              <Link
                href="/forgot-password"
                className="self-end text-xs font-medium text-neutral-600 hover:text-black hover:underline"
              >
                Forgot password?
              </Link>
            )}
            <button type="submit" className="w-full rounded-md bg-black px-3 py-2.5 text-sm font-medium text-white ring-1 ring-neutral-700 transition-colors hover:bg-neutral-800">
              {isLogin ? "Sign in with Email" : "Sign up with Email"}
            </button>
          </form>
          {error && <p className="mt-3 w-full rounded-md bg-red-50 px-3 py-2 text-left text-xs text-red-700">{error}</p>}

          <div className="my-3.5 h-px w-full bg-neutral-200" />
          <button
            className={socialButton}
            type="button"
            onClick={() => setError("Google sign-in will be connected when OAuth credentials are configured.")}
          >
            <GoogleIcon />Continue with Google
          </button>

          <div className="mt-5 text-sm text-neutral-500">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => {
                setError("");
                setIsLogin((value) => !value);
              }}
              className="font-medium text-black hover:underline"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-neutral-600">
            By proceeding, you agree to the PostPuls{" "}
            <Link href="/terms" className="text-neutral-600 hover:text-black">Terms of Service</Link>{" "}
            and <Link href="/privacy" className="text-neutral-600 hover:text-black">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </main>
  );
}

function SignupPage() {
  return <AuthPage />;
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

