import { motion } from "framer-motion";
import { translateCoords } from "./positionHelper";

interface ConnectionProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  delay?: number;
}

export function Connection({ from, to, delay = 0 }: ConnectionProps) {
  const start = translateCoords(from.x, from.y);
  const end = translateCoords(to.x, to.y);

  return (
    <motion.line
      x1={start.x}
      y1={start.y}
      x2={end.x}
      y2={end.y}
      stroke="white"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      strokeWidth="2"
      strokeDasharray="1 1"
      transition={{
        delay: delay,
        duration: 0.4,
        ease: "easeOut",
      }}
    />
    /* <line
      x1={start.x}
      y1={start.y}
      x2={end.x}
      y2={end.y}
      className="stroke-amber-400 stroke-[2px]"
      strokeDasharray="8 6" // Adjust these numbers for dash/gap length
      strokeLinecap="round"
    /> */
  );
}
