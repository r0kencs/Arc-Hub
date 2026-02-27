import { AnimatedPath } from "./AnimatedPath";
import { Connection } from "./Connection";
import { DetonatePosition } from "./DetonatePosition";
import { translateCoords } from "./positionHelper";
import { ThrowPosition } from "./ThrowPosition";

interface Props {
  throwPosition: { x: number; y: number };
  detonatePosition: { x: number; y: number };
  trajectory?: { x: number; y: number }[];
}

export function TrajectoryRenderer({
  throwPosition,
  detonatePosition,
  trajectory = [],
}: Props) {
  // 1. Convert all points into the coordinate system
  const points = [throwPosition, ...trajectory, detonatePosition].map((p) =>
    translateCoords(p.x, p.y),
  );

  // 2. Build the SVG path string: "M x1 y1 L x2 y2 L x3 y3..."
  const pathData = points.reduce((acc, point, i) => {
    return i === 0
      ? `M ${point.x} ${point.y}`
      : `${acc} L ${point.x} ${point.y}`;
  }, "");

  return (
    <>
      <AnimatedPath d={pathData} />

      <ThrowPosition x={throwPosition.x} y={throwPosition.y} />
      <DetonatePosition x={detonatePosition.x} y={detonatePosition.y} />
    </>
  );
}
