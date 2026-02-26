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
        r="16"
        className="fill-amber-600 stroke-amber-600/50 stroke-[8px]"
      />

      <text
        x={xT}
        y={yT}
        fontSize="18"
        fontWeight="bold"
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-black pointer-events-none select-none"
      >
        {label}
      </text>
    </g>
  );
}
