import { translateCoords } from "./positionHelper";

interface ConnectionProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
}

export function Connection({ from, to }: ConnectionProps) {
  const start = translateCoords(from.x, from.y);
  const end = translateCoords(to.x, to.y);

  return (
    <line
      x1={start.x}
      y1={start.y}
      x2={end.x}
      y2={end.y}
      className="stroke-amber-600 stroke-[3px]"
      strokeDasharray="8 6" // Adjust these numbers for dash/gap length
      strokeLinecap="round"
    />
  );
}
