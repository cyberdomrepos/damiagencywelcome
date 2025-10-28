import GradientUnderline from "./GradientUnderline";

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
};

export default function Section({
  id,
  title,
  children,
  className = "",
  align = "center",
  eyebrow,
  bodyClassName,
}: Props) {
  const titleAlign = align === "left" ? "text-left" : "text-center";

  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`mx-auto max-w-screen-2xl px-6 py-8 sm:py-12 md:py-16 lg:py-20 ${className}`}
      style={{
        fontFamily:
          '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
      }}
    >
      {eyebrow && (
        <p
          className={`text-xs tracking-widest text-white/40 uppercase ${titleAlign}`}
          style={{
            fontFamily:
              '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
          }}
        >
          {eyebrow}
        </p>
      )}

      <h2
        id={`${id}-title`}
        className={`${titleAlign} text-4xl md:text-6xl font-bold tracking-tight text-neutral-100 leading-tight text-balance drop-shadow-[0_12px_36px_rgba(0,0,0,0.55)]`}
        style={{
          fontFamily:
            '"Iosevka Aile", "SF Mono", "Monaco", "Cascadia Code", monospace',
        }}
      >
        {title}
      </h2>

      <GradientUnderline className="mt-6 sm:mt-8 md:mt-10 lg:mt-12" />

      <div
        className={
          bodyClassName ??
          "mt-8 sm:mt-10 md:mt-12 lg:mt-16 space-y-6 md:space-y-8 lg:space-y-10 [&>*:first-child]:mt-0"
        }
      >
        {children}
      </div>
    </section>
  );
}
