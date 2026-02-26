import { translateCoords } from "./positionHelper";

export function Position({
  x,
  y,
  label = "1",
}: {
  x: number;
  y: number;
  label?: string;
}) {
  const { x: xT, y: yT } = translateCoords(x, y);

  return (
    <g className="cursor-pointer">
      {/* The Circle */}
      <circle
        cx={xT}
        cy={yT}
        r="16"
        className="fill-amber-600 stroke-amber-600/50 stroke-[8px]"
      />

      <text
        x={xT}
        y={yT}
        fontSize="18"
        fontWeight="bold"
        textAnchor="middle" // Centers text horizontally
        dominantBaseline="central" // Centers text vertically
        className="fill-black pointer-events-none select-none" // Prevents text from blocking clicks
      >
        {label}
      </text>
    </g>
  );
}
