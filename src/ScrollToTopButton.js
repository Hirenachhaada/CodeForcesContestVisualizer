import React, { useState, useEffect } from "react";
import { Button } from "@chakra-ui/react"; // Optional, for styling

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    isVisible && (
      <Button
        onClick={scrollToTop}
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          zIndex: 1000,
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "50%",
          padding: "0.8rem 1rem",
          cursor: "pointer",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          fontSize: "1.5rem",
          transition: "opacity 0.3s ease-in-out",
        }}
        aria-label="Scroll to top"
      >
        ↑
      </Button>
    )
  );
};

export default ScrollToTopButton;
