import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Scrolls to an in-page anchor after route changes land a `#hash`; otherwise resets to top. */
export default function ScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 });
      return;
    }
    const id = hash.replace("#", "");
    const raf = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => cancelAnimationFrame(raf);
  }, [hash, pathname]);

  return null;
}
