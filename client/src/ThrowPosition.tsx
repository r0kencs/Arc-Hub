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
        r="16"
        className="fill-amber-600 stroke-amber-600/50 stroke-[8px]"
      />
    </g>
  );
}
