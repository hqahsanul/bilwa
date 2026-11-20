"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { clearPendingEmail, getPendingEmail, verifyOtp } from "@/lib/auth";

function VerifyPage() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [resendSeconds, setResendSeconds] = useState(60);
  const email = getPendingEmail();
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (resendSeconds <= 0) return;
    const timer = window.setInterval(() => {
      setResendSeconds((seconds) => Math.max(0, seconds - 1));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [resendSeconds]);

  const updateCode = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = code.split("");
    next[index] = digit;
    setCode(next.join("").slice(0, 6));
    if (digit && index < 5) inputs.current[index + 1]?.focus();
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fafafa] px-5 text-black">
      <div className="w-full max-w-[670px] rounded-[20px] border border-neutral-200 bg-white px-9 py-10 shadow-[0_2px_8px_rgba(0,0,0,.12)]">
        <Link href="/signup" className="sr-only">Back to signup</Link>
        <h1 className="text-[24px] font-semibold tracking-tight">Verify your login</h1>
        <p className="mt-3 text-[20px] leading-7 text-neutral-500">
          Enter the verification code we sent to your email address:
          <br />
          <strong className="text-black">{email || "your email address"}.</strong>
        </p>
        <form
          className="mt-10"
          onSubmit={async (event) => {
            event.preventDefault();
            setError("");
            try {
              await verifyOtp(email, code);
              clearPendingEmail();
              router.push("/dashboard");
            } catch (verificationError) {
              setError(verificationError instanceof Error ? verificationError.message : "Invalid code.");
            }
          }}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-[21px] font-medium">Verification code</h2>
            <button
              type="button"
              disabled={resendSeconds > 0}
              onClick={() => {
                setCode("");
                setResendSeconds(60);
              }}
              className="inline-flex items-center gap-2 text-[18px] hover:underline disabled:cursor-not-allowed disabled:opacity-45 disabled:no-underline"
            >
              <RefreshCw className="h-5 w-5" />
              {resendSeconds > 0 ? `Resend Code (00:${String(resendSeconds).padStart(2, "0")})` : "Resend Code"}
            </button>
          </div>
          <div className="mt-5 flex items-center gap-4">
            <div className="flex">
              {[0, 1, 2].map((index) => (
                <input
                  key={index}
                  ref={(element) => { inputs.current[index] = element; }}
                  value={code[index] ?? ""}
                  onChange={(event) => updateCode(index, event.target.value)}
                  inputMode="numeric"
                  maxLength={1}
                  autoComplete={index === 0 ? "one-time-code" : "off"}
                  aria-label={`Verification digit ${index + 1}`}
                  className="h-[54px] w-[54px] border border-neutral-200 bg-white text-center text-xl outline-none first:rounded-l-xl last:rounded-r-xl focus:z-10 focus:border-black"
                />
              ))}
            </div>
            <span className="text-3xl">—</span>
            <div className="flex">
              {[3, 4, 5].map((index) => (
                <input
                  key={index}
                  ref={(element) => { inputs.current[index] = element; }}
                  value={code[index] ?? ""}
                  onChange={(event) => updateCode(index, event.target.value)}
                  inputMode="numeric"
                  maxLength={1}
                  aria-label={`Verification digit ${index + 1}`}
                  className="h-[54px] w-[54px] border border-neutral-200 bg-white text-center text-xl outline-none first:rounded-l-xl last:rounded-r-xl focus:z-10 focus:border-black"
                />
              ))}
            </div>
          </div>
          {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
          <button type="submit" className="mt-9 h-[54px] w-full rounded-xl bg-[#171717] text-[18px] font-medium text-white shadow-[0_2px_5px_rgba(0,0,0,.2)] hover:bg-black">
            Verify
          </button>
        </form>
        <p className="mt-5 text-center text-[20px] text-neutral-500">
          Having trouble signing in?{" "}
          <a href="mailto:support@postpuls.com" className="text-black hover:underline">Contact support</a>
        </p>
      </div>
    </main>
  );
}

export default VerifyPage;
