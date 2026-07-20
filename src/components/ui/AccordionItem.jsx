import { useRef } from "react";
import { ChevronDown } from "lucide-react";

export default function AccordionItem({ question, answer, isOpen, onToggle }) {
  const panelRef = useRef(null);

  return (
    <div className="rounded-xl border border-border bg-surface shadow-sm transition-shadow hover:shadow-md">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary md:p-6"
      >
        <span className="text-base font-medium text-ink md:text-lg">{question}</span>
        <ChevronDown
          className={`h-5 w-5 flex-shrink-0 text-primary transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        ref={panelRef}
        style={{ maxHeight: isOpen ? panelRef.current?.scrollHeight ?? 400 : 0 }}
        className="overflow-hidden px-5 transition-[max-height] duration-300 ease-in-out md:px-6"
      >
        <p className="pb-5 text-muted md:pb-6">{answer}</p>
      </div>
    </div>
  );
}
