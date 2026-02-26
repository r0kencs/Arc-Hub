import { TrajectoryRenderer } from "./TrajectoryRenderer";

export function Minimap() {
  return (
    <div className="flex justify-center items-center p-4 h-full w-full">
      <svg viewBox="0 0 1024 1024" className="h-full w-full">
        <image href="/de_mirage_filtered.png" width="1024" height="1024" />

        <TrajectoryRenderer
          throwPosition={{ x: 899.46875, y: -1040.25 }}
          detonatePosition={{ x: -635.375, y: -1649.90625 }}
          trajectory={[{ x: -797.5625, y: -1596.71875 }]}
        />

        <TrajectoryRenderer
          throwPosition={{ x: 1404.75, y: 64.9375 }}
          detonatePosition={{ x: -236.1875, y: -496.46875 }}
        />
      </svg>
    </div>
  );
}
