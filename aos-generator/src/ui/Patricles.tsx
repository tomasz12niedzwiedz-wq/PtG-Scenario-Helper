import Particles from "react-tsparticles";

export default function ParticleFX() {
  return (
    <Particles
      options={{
        particles: {
          number: { value: 50 },
          color: { value: "#ff6600" },
          move: { enable: true, speed: 1 },
          size: { value: 3 },
          opacity: { value: 0.5 },
        },
      }}
    />
  );
}