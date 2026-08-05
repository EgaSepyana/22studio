import {
  Hourglass,
  FileCheck,
  Package,
  CircleCheckBig,
  Truck,
  Store,
  Scissors,
  SprayCan,
  Shirt,
  BadgeCheck,
  Settings2,
  Check,
} from "lucide-react";
import { STAGES, SUB_STAGE_ICONS, getStageStatus } from "../../data/trackingData";

const dateFormatter = new Intl.DateTimeFormat("id-ID", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

function formatTimestamp(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : dateFormatter.format(date);
}

const ICONS = {
  hourglass: Hourglass,
  "file-check": FileCheck,
  package: Package,
  "circle-check-big": CircleCheckBig,
  truck: Truck,
  store: Store,
  scissors: Scissors,
  "spray-can": SprayCan,
  shirt: Shirt,
  "badge-check": BadgeCheck,
};

const SUB_ICONS = { scissors: Scissors, "spray-can": SprayCan, shirt: Shirt, "badge-check": BadgeCheck };

const DOT_CLASSES = {
  done: "border-secondary bg-secondary text-white",
  active: "border-primary bg-primary text-primary-ink",
  pending: "border-border bg-surface text-muted",
};

const LINE_CLASSES = {
  done: "bg-secondary",
  active: "bg-border",
  pending: "bg-border",
};

function StageDot({ status, Icon }) {
  return (
    <div
      className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border-2 ${DOT_CLASSES[status]}`}
    >
      {status === "done" ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
    </div>
  );
}

export default function TrackingTimeline({ order }) {
  return (
    <ol>
      {STAGES.map((stage, i) => {
        const status = getStageStatus(order, stage.id);
        const Icon = ICONS[stage.icon] || Package;
        const isLast = i === STAGES.length - 1;
        const stageEvents = order.timeline.filter((t) => t.stage === stage.id && !t.subStage);
        const subEvents = order.timeline.filter((t) => t.stage === stage.id && t.subStage);

        return (
          <li key={stage.id} className="relative flex gap-5 pb-10">
            {!isLast && <span className={`absolute left-[22px] top-11 h-[calc(100%-2.75rem)] w-0.5 ${LINE_CLASSES[status]}`} />}
            <StageDot status={status} Icon={Icon} />

            <div className="flex-1 pt-1.5">
              <p
                className={`eyebrow text-xs ${
                  status === "pending" ? "text-muted" : status === "active" ? "text-primary" : "text-secondary"
                }`}
              >
                {status === "active" ? "Sedang Berlangsung" : status === "done" ? "Selesai" : "Menunggu"}
              </p>
              <h3 className={`font-display text-lg font-bold ${status === "pending" ? "text-muted" : "text-ink"}`}>
                {stage.label}
              </h3>

              {stageEvents.map((event, idx) => (
                <p key={idx} className="mt-1 text-sm text-muted">
                  {event.note}{" "}
                  <span className="font-mono text-xs text-muted/70">— {formatTimestamp(event.timestamp)}</span>
                </p>
              ))}

              {subEvents.length > 0 && (
                <div className="mt-4 space-y-3 border-l border-dashed border-border pl-5">
                  {subEvents.map((event, idx) => {
                    const SubIcon = SUB_ICONS[SUB_STAGE_ICONS[event.subStage]] || Settings2;
                    return (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-secondary/15 text-secondary">
                          <SubIcon className="h-3.5 w-3.5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-ink">{event.subStage}</p>
                          <p className="text-sm text-muted">{event.note}</p>
                          <p className="font-mono text-xs text-muted/70">{formatTimestamp(event.timestamp)}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
