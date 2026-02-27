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

const THROW_CIRCLE_RADIUS = 12;
const DETONATE_CIRCLE_RADIUS = 20;

function shortenLine(
  from: { x: number; y: number },
  to: { x: number; y: number },
  amount: number,
) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  const ratio = (len - amount) / len;
  return { x: from.x + dx * ratio, y: from.y + dy * ratio };
}

export function TrajectoryRenderer({
  throwPosition,
  detonatePosition,
  trajectory = [],
}: Props) {
  const points = [throwPosition, ...trajectory, detonatePosition].map((p) =>
    translateCoords(p.x, p.y),
  );

  const first = points[0];
  const last = points[points.length - 1];
  const secondPoint = points[1] ?? last;
  const secondToLast = points[points.length - 2] ?? first;

  const trimmedStart = shortenLine(secondPoint, first, THROW_CIRCLE_RADIUS);
  const trimmedEnd = shortenLine(secondToLast, last, DETONATE_CIRCLE_RADIUS);

  const pathPoints = [trimmedStart, ...points.slice(1, -1), trimmedEnd];

  const pathData = pathPoints.reduce(
    (acc, point, i) =>
      i === 0 ? `M ${point.x} ${point.y}` : `${acc} L ${point.x} ${point.y}`,
    "",
  );

  return (
    <>
      <AnimatedPath d={pathData} />
      <ThrowPosition x={throwPosition.x} y={throwPosition.y} />
      <DetonatePosition x={detonatePosition.x} y={detonatePosition.y} />
    </>
  );
}
