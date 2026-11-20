"use client";

export function BilvaCollectionsTeaser() {
  return (
    <section className="relative w-full bg-[#FAF7F2] pt-14 pb-20 border-t border-[#EFE8DD] text-center">
      <div className="max-w-4xl mx-auto px-4 flex flex-col items-center">
        {/* Decorative Gold Filigree Divider */}
        <div className="flex items-center justify-center gap-6 w-full max-w-xl">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C5A059] to-[#C5A059]/40" />
          <h2 className="font-serif text-3xl sm:text-4xl text-[#0E3D30] font-normal tracking-[0.04em] whitespace-nowrap">
            Explore our collections
          </h2>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#C5A059] to-[#C5A059]/40" />
        </div>

        <p className="font-serif italic text-sm sm:text-base text-[#617C71] max-w-md mt-3 tracking-wide">
          Sacred artistry sculpted in 24K gold, pure sterling silver, and authentic Vedic gems.
        </p>

        {/* Minimalist upcoming section placeholder pill */}
        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#D5C9B7] bg-[#F4EFE6]/60 px-5 py-2 text-xs font-sans tracking-widest uppercase text-[#8A703F]">
          <span>Curated categories ready for preview</span>
        </div>
      </div>
    </section>
  );
}
