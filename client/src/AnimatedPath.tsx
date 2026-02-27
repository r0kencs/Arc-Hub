import { motion } from "motion/react";

export function AnimatedPath({ d }: { d: string }) {
  return (
    <>
      <defs>
        <mask id="dash-mask">
          <motion.path
            d={d}
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="10 6"
            fill="none"
          />
        </mask>
      </defs>

      <motion.path
        d={d}
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        mask="url(#dash-mask)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
    </>
  );
}
