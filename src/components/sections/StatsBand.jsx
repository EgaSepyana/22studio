import { useCms } from "../../context/CmsContext";
import StatCounter from "../ui/StatCounter";

export default function StatsBand() {
  const { statsBand } = useCms();
  return (
    <section className="bg-[#171512] py-16 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {statsBand.map((stat) => (
            <StatCounter
              key={stat.label}
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              label={stat.label}
              className="text-center"
              valueClassName="text-white"
              labelClassName="text-white/50"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
