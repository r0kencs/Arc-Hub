// Official Mirage metadata
const MIRAGE_CONFIG = {
  posX: -3230, // The X coordinate of the top-left corner of the radar
  posY: 1713, // The Y coordinate of the top-left corner of the radar
  scale: 5.0, // How many game units represent 1 pixel on a 1024x1024 map
};

export const translateCoords = (posX: number, posY: number) => {
  // Formula: (GameCoord - Offset) / Scale
  const x = (posX - MIRAGE_CONFIG.posX) / MIRAGE_CONFIG.scale;

  // Invert Y because game Y increases upward, SVG Y increases downward
  const y = (MIRAGE_CONFIG.posY - posY) / MIRAGE_CONFIG.scale;

  return { x, y };
};
