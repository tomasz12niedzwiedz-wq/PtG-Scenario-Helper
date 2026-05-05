import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function TwistSelection({ options, onSelect }: any) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleClick = (t: any) => {
    setSelectedId(t.id);

    // delay żeby animacja się wykonała
    setTimeout(() => {
      onSelect(t);
    }, 800);
  };

  return (
    <div className="twist-selection">
      <AnimatePresence>
        {options.map((t: any) => {
          const isSelected = selectedId === t.id;
          const isOther = selectedId && selectedId !== t.id;

          return (
            <motion.div
              key={t.id}
              className={`twist-card ${isSelected ? "selected" : ""} ${
                isOther ? "burn" : ""
              }`}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={!selectedId ? { scale: 1.08 } : {}}
              onClick={() => !selectedId && handleClick(t)}
            >
              <div className="card-inner">
                <div className="card-front">
                  <h3>{t.name}</h3>
                  <p>{t.effect}</p>
                </div>

                <div className="card-back">
                  <span>?</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}