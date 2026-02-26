import { Connection } from "./Connection";
import { DetonatePosition } from "./DetonatePosition";
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
  return (
    <>
      {trajectory.length > 0 ? (
        <>
          <Connection from={throwPosition} to={trajectory[0]} />
          {trajectory.map((point, index) => {
            const nextPoint = trajectory[index + 1] || detonatePosition;

            return (
              <Connection
                key={`segment-${index}`}
                from={point}
                to={nextPoint}
              />
            );
          })}
          <Connection
            from={trajectory[trajectory.length - 1]}
            to={detonatePosition}
          />
        </>
      ) : (
        <Connection from={throwPosition} to={detonatePosition} />
      )}

      <ThrowPosition x={throwPosition.x} y={throwPosition.y} />
      <DetonatePosition x={detonatePosition.x} y={detonatePosition.y} />
    </>
  );
}
