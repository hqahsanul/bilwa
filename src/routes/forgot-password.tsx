"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { forgotPassword, resetPassword } from "@/lib/auth";

function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [requested, setRequested] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const inputClass =
    "w-full rounded-md border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-black outline-none placeholder:text-neutral-500 focus:border-black focus:ring-1 focus:ring-black";

  async function requestCode(event: FormEvent) {
    event.preventDefault();
    setError("");
    try {
      await forgotPassword(email);
      setRequested(true);
      setMessage("For development, use OTP 123456.");
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Unable to send reset code.");
    }
  }

  async function updatePassword(event: FormEvent) {
    event.preventDefault();
    setError("");
    try {
      await resetPassword(email, code, password);
      router.push("/login");
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Unable to reset password.");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4 py-8">
      <div className="w-full max-w-[400px] rounded-xl border border-neutral-200 bg-white p-8 text-black shadow-2xl">
        <Link href="/login" className="text-sm text-neutral-500 hover:text-black">
          Back to sign in
        </Link>
        <h1 className="mt-8 text-2xl font-semibold tracking-tight">Reset your password</h1>
        <p className="mt-2 text-sm leading-relaxed text-neutral-500">
          Enter your email to receive a password reset code.
        </p>

        {!requested ? (
          <form onSubmit={requestCode} className="mt-6 flex flex-col gap-3">
            <input
              className={inputClass}
              type="email"
              placeholder="name@work-email.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <button type="submit" className="rounded-md bg-black px-3 py-2.5 text-sm font-medium text-white hover:bg-neutral-800">
              Send reset code
            </button>
          </form>
        ) : (
          <form onSubmit={updatePassword} className="mt-6 flex flex-col gap-3">
            <input
              className={inputClass}
              inputMode="numeric"
              pattern="[0-9]{6}"
              placeholder="6-digit code"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              required
            />
            <input
              className={inputClass}
              type="password"
              minLength={8}
              placeholder="New password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <button type="submit" className="rounded-md bg-black px-3 py-2.5 text-sm font-medium text-white hover:bg-neutral-800">
              Update password
            </button>
          </form>
        )}

        {message && <p className="mt-3 rounded-md bg-neutral-100 px-3 py-2 text-xs text-neutral-700">{message}</p>}
        {error && <p className="mt-3 rounded-md bg-red-50 px-3 py-2 text-xs text-red-700">{error}</p>}
      </div>
    </main>
  );
}

export default ForgotPasswordPage;
