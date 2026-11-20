import { BilvaLogo } from "@/components/bilva/bilva-logo";

export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAF7F2] text-[#0E3D30]">
      <div className="flex flex-col items-center gap-4">
        <BilvaLogo variant="full" size="lg" />
        <span className="h-1 w-32 overflow-hidden rounded-full bg-[#E5DCB] mt-2">
          <span className="block h-full w-1/2 animate-pulse rounded-full bg-[#C49B4C]" />
        </span>
      </div>
    </main>
  );
}
