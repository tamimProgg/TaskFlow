import { useMemo } from "react";

const AnimatedBG = () => {

  const particles = useMemo(() => {
    return Array.from({ length: 20 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 5 + Math.random() * 10,
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      {/* Glow blobs */}
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-purple-500 blur-3xl opacity-30 animate-pulse"></div>

      <div
        className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-pink-500 blur-3xl opacity-30 animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-indigo-500 blur-3xl opacity-30 animate-pulse"
        style={{ animationDelay: "4s" }}
      ></div>

      {/* Particles */}
      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full opacity-20"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animation: `float ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        ></div>
      ))}

    </div>
  );
};

export default AnimatedBG;
