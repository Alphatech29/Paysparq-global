import anime from "animejs";
import { useEffect } from "react";

const WaterDropGrid = () => {
  return (
    <div className="relative w-full h-full grid place-content-center bg-primary-700 px-5 py-10 min-h-screen">
      <DotGrid />
    </div>
  );
};

const GRID_WIDTH = 20;
const GRID_HEIGHT = 12;

const DotGrid = () => {
  useEffect(() => {
    // Check if the document is ready before running the interval
    if (typeof window === "undefined") return;

    const interval = setInterval(() => {
      // Generate a random index
      const randomIndex = Math.floor(Math.random() * (GRID_WIDTH * GRID_HEIGHT));
      const randomDot = document.querySelector(`.dot-point[data-index="${randomIndex}"]`);

      if (randomDot) {
        randomDot.click(); // Simulate a click event
      } else {
        console.warn(`No dot found at index ${randomIndex}`); // Debugging: Verify random index
      }
    }, 5000); // 5 seconds interval

    return () => {
      clearInterval(interval);
      console.log("Interval cleared"); // Debugging: Confirm cleanup
    };
  }, []); // Empty dependency array ensures the effect runs only once

  const handleDotClick = (e) => {
    anime({
      targets: ".dot-point",
      scale: [
        { value: 1.35, easing: "easeOutSine", duration: 250 },
        { value: 1, easing: "easeInOutQuad", duration: 500 },
      ],
      translateY: [
        { value: -15, easing: "easeOutSine", duration: 250 },
        { value: 0, easing: "easeInOutQuad", duration: 500 },
      ],
      opacity: [
        { value: 1, easing: "easeOutSine", duration: 250 },
        { value: 0.5, easing: "easeInOutQuad", duration: 500 },
      ],
      delay: anime.stagger(100, {
        grid: [GRID_WIDTH, GRID_HEIGHT],
        from: e.target.dataset.index,
      }),
    });
  };

  // Generate dots for the grid
  const dots = [];
  let index = 0;

  for (let i = 0; i < GRID_WIDTH; i++) {
    for (let j = 0; j < GRID_HEIGHT; j++) {
      dots.push(
        <div
          className="group cursor-pointer rounded-full p-2 transition-colors hover:bg-slate-600"
          data-index={index}
          key={`${i}-${j}`}
        >
          <div
            className="dot-point bg-indigo-700 h-2 w-2 rounded-full bg-gradient-to-b from-primary-700 to-primary-500 opacity-50 group-hover:from-indigo-600 group-hover:to-white"
            data-index={index}
            onClick={handleDotClick} // Attach click handler
          />
        </div>
      );
      index++;
    }
  }

  return (
    <div
      style={{ gridTemplateColumns: `repeat(${GRID_WIDTH}, 1fr)` }}
      className="grid w-full h-full gap-2"
    >
      {dots}
    </div>
  );
};

export default WaterDropGrid;
