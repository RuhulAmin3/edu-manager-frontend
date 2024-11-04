import { useEffect, useState } from "react";

const useScrollPosition = (topPosition: number = 5) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > topPosition);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [topPosition]);

  return isScrolled;
};

export default useScrollPosition;
