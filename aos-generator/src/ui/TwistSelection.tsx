import { motion } from "framer-motion";
import type { Twist } from "../engine/types";

export default function TwistSelection({
  options,
  onSelect,
}: {
  options: Twist[];
  onSelect: (t: Twist) => void;
}) {
  return (
    <div className="twist-selection">
      {options.map((t) => (
        <motion.div
          key={t.id}
          className="twist-card"
          whileHover={{ scale: 1.1, rotate: 1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(t)}
        >
          <h3>{t.name}</h3>
          <p>{t.effect}</p>
        </motion.div>
      ))}
    </div>
  );
}