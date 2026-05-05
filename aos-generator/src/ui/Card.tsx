import { motion } from "framer-motion";

export default function Card({ children }: any) {
  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
    >
      {children}
    </motion.div>
  );
}