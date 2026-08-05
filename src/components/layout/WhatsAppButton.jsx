import { useCms } from "../../context/CmsContext";
import { WhatsAppIcon } from "../ui/BrandIcons";

export default function WhatsAppButton() {
  const { waLink } = useCms();
  return (
    <a
      href={waLink}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat via WhatsApp"
      className="fixed bottom-6 left-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:-translate-y-1"
    >
      <WhatsAppIcon className="h-6 w-6" />
    </a>
  );
}
