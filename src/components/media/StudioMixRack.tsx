import type { PlaylistSlot } from "@/lib/types";

export function StudioMixRack({ slots }: { slots: PlaylistSlot[] }) {
  return (
    <ol className="divide-y divide-paper-deep overflow-hidden rounded-md border border-paper-deep bg-paper-elevated">
      {slots.map((slot, index) => (
        <li
          key={`${slot.role}-${index}`}
          className={`grid grid-cols-[3rem_1fr] gap-4 px-4 py-3 md:grid-cols-[4rem_12rem_1fr] ${
            index % 2 === 1 ? "bg-paper-deep/50" : ""
          }`}
        >
          <span className="font-mono text-[13px] text-copper">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-semibold text-ink">{slot.role}</span>
          <span className="col-span-2 text-[14px] text-line md:col-span-1">
            {slot.cue}
          </span>
        </li>
      ))}
    </ol>
  );
}
