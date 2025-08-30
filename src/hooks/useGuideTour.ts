/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";
import { driver } from "driver.js";
import "driver.js/driver.css";

export function useGuideTour() {
  const driverRef = useRef<any>(null);

  const tourSteps = [
    {
      element: "#home-link",
      popover: {
        title: "Home",
        description: "This is the home link",
        side: "bottom",
      },
    },
    {
      element: "#about-link",
      popover: {
        title: "About",
        description: "Here you can learn about us",
        side: "bottom",
      },
    },
  ];

  const initDriver = () => {
    if (!driverRef.current) {
      driverRef.current = driver({
        showProgress: true,
        animate: true,
        allowClose: false,
        overlayOpacity: 0.5,
        nextBtnText: "Next →",
        prevBtnText: "← Back",
        doneBtnText: "Done",
      });
    }
    driverRef.current.setSteps(tourSteps);
    driverRef.current.drive();
  };

  return { initDriver };
}
