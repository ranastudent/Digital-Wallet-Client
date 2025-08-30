"use client";
import { useEffect, useRef } from "react";
import { driver, type Driver, type DriveStep } from "driver.js";
import "driver.js/dist/driver.css";

function GuideTour() {
  const driverRef = useRef<Driver | null>(null);

  const tourSteps: DriveStep[] = [
  {
    element: ".nav-menu",
    popover: {
      title: "Navigation Menu",
      description: "Switch between sections using this menu.",
      side: "bottom", // ✅ typed correctly
    },
  },
  {
    element: ".dashboard-stats",
    popover: {
      title: "Dashboard Stats",
      description: "Quick overview of your balances and transactions.",
      side: "top",
    },
  },
  {
    element: ".chart-section",
    popover: {
      title: "Trends Chart",
      description: "Visualize your transaction trends here.",
      side: "top",
    },
  },
  {
    element: ".table-section",
    popover: {
      title: "Search & Filter Table",
      description: "Find and filter records easily.",
      side: "top",
    },
  },
  {
    element: ".theme-toggle",
    popover: {
      title: "Theme Toggle",
      description: "Switch between light and dark mode.",
      side: "left",
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
      driverRef.current.setSteps(tourSteps);
    }
  };

  const startTour = () => {
    initDriver();
    driverRef.current?.drive();
    localStorage.setItem("tourCompleted", "true");
  };

  useEffect(() => {
    const tourDone = localStorage.getItem("tourCompleted");
    if (!tourDone) {
      startTour();
    } else {
      initDriver(); // keep it ready for restart
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-6 space-y-4">
      {/* Example elements to attach tour steps */}
      <nav className="nav-menu text-amber-950 bg-gray-200 p-2 rounded">Navigation Menu</nav>

      <div className="dashboard-stats text-amber-950 bg-blue-200 p-4 rounded">
        Dashboard Stats
      </div>

      <div className="chart-section text-amber-950 bg-green-200 p-4 rounded">
        Chart Section
      </div>

      <div className="table-section text-amber-950 bg-yellow-200 p-4 rounded">
        Table Section
      </div>

      <button className="theme-toggle w-full text-left  bg-gray-800 text-white p-2 rounded">
        Toggle Theme
      </button> <br />

      {/* Restart button */}
      <button
        onClick={startTour}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      > 
        Restart Tour
      </button>
    </div>
  );
}

export default GuideTour;
