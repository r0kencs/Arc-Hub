interface Position {
  x: number;
  y: number;
  z: number;
}

export function parseSetPos(input: string): Position | null {
  const regex = /setpos\s+(-?\d+\.?\d*)\s+(-?\d+\.?\d*)\s+(-?\d+\.?\d*)/i;
  const match = input.match(regex);

  if (!match) return null;

  return {
    x: parseFloat(match[1]),
    y: parseFloat(match[2]),
    z: parseFloat(match[3]),
  };
}
