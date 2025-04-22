import { useEffect, useState } from "react";

const useIsMobile = (resolution = 768) => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth <= resolution
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= resolution);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [resolution]);

  return isMobile;
};

export default useIsMobile;
