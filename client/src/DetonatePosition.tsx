import { translateCoords } from "./positionHelper";

interface Props {
  x: number;
  y: number;
  label?: string;
}

export function DetonatePosition({ x, y, label = "9" }: Props) {
  const { x: xT, y: yT } = translateCoords(x, y);

  return (
    <g className="cursor-pointer">
      <circle
        cx={xT}
        cy={yT}
        r="20"
        className="fill-amber-400/50 stroke-amber-400 stroke-[2px] hover:fill-amber-400 transition"
      />

      <text
        x={xT}
        y={yT}
        fontSize="18"
        fontWeight="bold"
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-white pointer-events-none select-none text-[24px]"
      >
        {label}
      </text>
    </g>
  );
}
