import Rule from "./Rule";

type Props = {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
};

export default function Section({
  id,
  title,
  children,
  className = "",
}: Props) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`mx-auto max-w-screen-2xl px-6 py-16 md:py-20 ${className}`}
    >
      <h2
        id={`${id}-title`}
        className="text-4xl md:text-6xl font-bold tracking-tight text-neutral-100 leading-tight text-balance text-center drop-shadow-[0_12px_36px_rgba(0,0,0,0.55)]"
      >
        {title}
      </h2>

      {/* unified underline and rhythm */}
      <Rule className="mt-4 md:mt-6" />

      {/* body wrapper enforces consistent spacing; first child has no extra top margin */}
      <div className="mt-6 md:mt-8 space-y-6 md:space-y-8 [&>*:first-child]:mt-0">
        {children}
      </div>
    </section>
  );
}
