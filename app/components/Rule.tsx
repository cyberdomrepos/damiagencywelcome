export default function Rule({
  className = "",
  widthClass = "w-40 md:w-56",
}: {
  className?: string;
  widthClass?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={[
        "mx-auto h-px",
        widthClass,
        // unified gradient
        "bg-linear-to-r from-transparent via-white/30 to-transparent",
        className,
      ].join(" ")}
    />
  );
}
