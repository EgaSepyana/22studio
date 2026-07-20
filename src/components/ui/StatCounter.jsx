import { useCountUp } from "../../hooks/useCountUp";

export default function StatCounter({
  value,
  prefix = "",
  suffix = "",
  label,
  className = "",
  valueClassName = "text-ink",
  labelClassName = "text-muted",
}) {
  const { ref, display } = useCountUp(value);

  return (
    <div ref={ref} className={className}>
      <div className={`font-display text-4xl font-bold md:text-5xl ${valueClassName}`}>
        {prefix}
        {display.toLocaleString("id-ID")}
        {suffix}
      </div>
      <p className={`eyebrow mt-2 text-xs ${labelClassName}`}>{label}</p>
    </div>
  );
}
