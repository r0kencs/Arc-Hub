import { translateCoords } from "./positionHelper";

interface Props {
  x: number;
  y: number;
}

export function ThrowPosition({ x, y }: Props) {
  const { x: xT, y: yT } = translateCoords(x, y);

  return (
    <g className="cursor-pointer">
      <circle
        cx={xT}
        cy={yT}
        r="12"
        className="fill-amber-400/50 stroke-amber-400 stroke-[2px]"
      />
    </g>
  );
}
