// Official Mirage metadata
const MIRAGE_CONFIG = {
  posX: -3230, // The X coordinate of the top-left corner of the radar
  posY: 1713, // The Y coordinate of the top-left corner of the radar
  scale: 5.0, // How many game units represent 1 pixel on a 1024x1024 map
};

const translateCoords = (posX: number, posY: number) => {
  // Formula: (GameCoord - Offset) / Scale
  const x = (posX - MIRAGE_CONFIG.posX) / MIRAGE_CONFIG.scale;

  // Invert Y because game Y increases upward, SVG Y increases downward
  const y = (MIRAGE_CONFIG.posY - posY) / MIRAGE_CONFIG.scale;

  return { x, y };
};

export function Minimap({ playerPos = { x: 1216, y: -115 } }) {
  const { x, y } = translateCoords(playerPos.x, playerPos.y);

  return (
    <div className="flex justify-center items-center p-4">
      <svg
        viewBox="0 0 1024 1024"
        className="w-[500px] h-[500px] border-2 border-white/10 shadow-xl"
      >
        {/* Reference the image from the public folder */}
        <image href="/de_mirage.png" width="1024" height="1024" />

        {/* Player Marker */}
        <circle
          cx={x}
          cy={y}
          r="12"
          className="fill-yellow-400 stroke-black stroke-[3px] transition-all duration-200 ease-out"
        />
      </svg>
    </div>
  );
}
