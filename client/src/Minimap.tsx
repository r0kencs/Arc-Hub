import { useState } from "react";
import { TrajectoryRenderer } from "./TrajectoryRenderer";

export function Minimap() {
  const [animationKey, setAnimationKey] = useState(0);

  const handleReplay = () => {
    // Incrementing the key forces React to re-render the children from scratch
    setAnimationKey((prev) => prev + 1);
  };

  return (
    <div className="flex justify-center items-center p-4 h-full w-full">
      <svg viewBox="0 0 1024 1024" className="h-full w-full">
        <image href="/de_mirage_filtered.png" width="1024" height="1024" />

        <TrajectoryRenderer
          throwPosition={{ x: 899.46875, y: -1040.25 }}
          detonatePosition={{ x: -635.375, y: -1649.90625 }}
          trajectory={[{ x: -797.5625, y: -1596.71875 }]}
        />

        {/* <TrajectoryRenderer
          throwPosition={{ x: 1404.75, y: 64.9375 }}
          detonatePosition={{ x: -236.1875, y: -496.46875 }}
        /> */}

        <button
          onClick={handleReplay}
          style={{ position: "absolute", top: 10, left: 10, zIndex: 10 }}
        >
          ☄️ Throw!
        </button>
      </svg>
    </div>
  );
}
