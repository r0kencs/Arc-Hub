import { Position } from "./Position";

export function Minimap() {
  return (
    <div className="flex justify-center items-center p-4">
      <svg viewBox="0 0 1024 1024" className="w-[500px] h-[500px]">
        {/* Reference the image from the public folder */}
        <image href="/de_mirage.png" width="1024" height="1024" />

        {/* Player Marker */}
        <Position x={1216} y={-115} />

        <Position x={907.297852} y={-1036.03125} />
      </svg>
    </div>
  );
}
