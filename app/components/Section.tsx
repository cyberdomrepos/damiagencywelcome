import Rule from "./Rule";

type Props = {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  /** 'center' (default) or 'left' — controls the h2 alignment */
  align?: "center" | "left";
  /** Optional eyebrow above the title (muted, uppercase) */
  eyebrow?: string;
  /** Pass custom classes to the body wrapper (overrides default space-y rhythm) */
  bodyClassName?: string;
  /** Hide the divider Rule if you don’t want it */
  noRule?: boolean;
};

export default function Section({
  id,
  title,
  children,
  className = "",
  align = "center",
  eyebrow,
  bodyClassName,
  noRule = false,
}: Props) {
  const titleAlign = align === "left" ? "text-left" : "text-center";

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`mx-auto max-w-screen-2xl px-6 py-16 md:py-20 ${className}`}
    >
      {eyebrow && (
        <p
          className={`text-xs tracking-widest text-white/40 uppercase ${titleAlign}`}
        >
          {eyebrow}
        </p>
      )}

      <h2
        id={`${id}-title`}
        className={`${titleAlign} text-4xl md:text-6xl font-bold tracking-tight text-neutral-100 leading-tight text-balance drop-shadow-[0_12px_36px_rgba(0,0,0,0.55)]`}
      >
        {title}
      </h2>

      {!noRule && <Rule className="mt-4 md:mt-6" />}

      <div
        className={
          bodyClassName ??
          "mt-6 md:mt-8 space-y-6 md:space-y-8 [&>*:first-child]:mt-0"
        }
      >
        {children}
      </div>
    </section>
  );
}
