export const Companies = () => {
  return (
    <section className="  space-y-12 py-36">
      <h2 className="text-5xl text-[#cacaca] font-bold text-center mx-auto max-w-5xl pb-24">
        Millions of people across 400,000 companies choose Opal
      </h2>

      <div className="overflow-hidden space-y-10
        [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        
        {/* Row 1 → left to right */}
        <div className="flex w-max animate-marquee gap-16">
          {[...logos, ...logos].map((logo, i) => (
            <img
              key={`row1-${i}`}
              src={logo}
              alt="company logo"
              className="h-10 opacity-70 grayscale"
            />
          ))}
        </div>

        {/* Row 2 → right to left */}
        <div className="flex w-max animate-marquee-reverse gap-16">
          {[...logos, ...logos].map((logo, i) => (
            <img
              key={`row2-${i}`}
              src={logo}
              alt="company logo"
              className="h-10 opacity-70 grayscale"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const logos = [
  "/apple.webp",
  "disney.png",
  "/Goldman_Sachs.webp",
  "/morgan_stanley.png",
  "/netflix.webp",
  "/slack.webp",
  "/spotify.png",
  "/stripe.webp",
];
