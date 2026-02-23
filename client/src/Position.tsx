import { translateCoords } from "./positionHelper";

export function Position({ x, y }: { x: number; y: number }) {
  const { x: xT, y: yT } = translateCoords(x, y);

  return (
    <circle
      cx={xT}
      cy={yT}
      r="16"
      className="fill-indigo-600 stroke-gray-900 stroke-[4px] transition-all duration-200 ease-out cursor-pointer hover:fill-transparent hover:stroke-indigo-600"
    />
  );
}
