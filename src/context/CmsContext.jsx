import { createContext, useContext, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { fetchCmsContent, getFreshCachedContent } from "../services/cms";

const CmsContext = createContext(null);

export function CmsProvider({ children }) {
  const [content, setContent] = useState(getFreshCachedContent);

  useEffect(() => {
    // If a fresh cache already seeded state above, this resolves from that
    // same cache with no network call — see fetchCmsContent().
    fetchCmsContent().then(setContent);
  }, []);

  if (!content) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-canvas">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return <CmsContext.Provider value={content}>{children}</CmsContext.Provider>;
}

/** Landing/site content from the CMS (see public_api_cms.md) — always ready by the time consumers render. */
export function useCms() {
  const content = useContext(CmsContext);
  if (!content) throw new Error("useCms must be used within a CmsProvider");
  return content;
}
