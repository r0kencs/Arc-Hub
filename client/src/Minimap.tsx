import { Connection } from "./Connection";
import { Position } from "./Position";

export function Minimap() {
  return (
    <div className="flex justify-center items-center p-4">
      <svg viewBox="0 0 1024 1024" className="w-[500px] h-[500px]">
        <image href="/de_mirage.png" width="1024" height="1024" />

        <Connection
          from={{ x: 899.46875, y: -1040.25 }}
          to={{ x: -797.5625, y: -1596.71875 }}
        />
        <Connection
          from={{ x: -797.5625, y: -1596.71875 }}
          to={{ x: -635.375, y: -1649.90625 }}
        />
        <Position x={899.46875} y={-1040.25} />
        <Position x={-635.375} y={-1649.90625} />

        <Connection
          from={{ x: 1404.75, y: 64.9375 }}
          to={{ x: -236.1875, y: -496.46875 }}
        />
        <Position x={1404.75} y={64.9375} />
        <Position x={-236.1875} y={-496.46875} />
      </svg>
    </div>
  );
}
