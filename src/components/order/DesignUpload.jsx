import { useEffect, useRef, useState } from "react";
import { UploadCloud, FileText, X } from "lucide-react";

const ACCEPTED = ".cdr,.ai,.psd,.png,.jpg,.jpeg,.pdf";
const PREVIEWABLE = ["image/png", "image/jpeg"];

function formatSize(bytes) {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function FilePreviewRow({ file, onRemove }) {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (!PREVIEWABLE.includes(file.type)) return;
    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return (
    <li className="flex items-center gap-3 rounded-lg border border-border bg-surface p-3">
      {url ? (
        <img src={url} alt="" className="h-10 w-10 rounded object-cover" />
      ) : (
        <FileText className="h-8 w-8 flex-shrink-0 text-primary" />
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-ink">{file.name}</p>
        <p className="text-xs text-muted">{formatSize(file.size)}</p>
      </div>
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Hapus ${file.name}`}
        className="cursor-pointer text-muted hover:text-primary"
      >
        <X className="h-4 w-4" />
      </button>
    </li>
  );
}

export default function DesignUpload({ files, onFilesChange }) {
  const inputRef = useRef(null);

  const addFiles = (fileList) => onFilesChange([...files, ...Array.from(fileList)]);
  const removeFile = (i) => onFilesChange(files.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-4">
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
        }}
        className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-border bg-canvas px-6 py-10 text-center transition-colors hover:border-primary"
      >
        <UploadCloud className="h-8 w-8 text-primary" />
        <p className="font-medium text-ink">Klik atau seret file desain ke sini</p>
        <p className="text-sm text-muted">Mendukung CDR, AI, PSD, PDF, PNG, JPG</p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={ACCEPTED}
          onChange={(e) => {
            if (e.target.files?.length) addFiles(e.target.files);
            e.target.value = "";
          }}
          className="hidden"
        />
      </div>

      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((file, i) => (
            <FilePreviewRow key={`${file.name}-${i}`} file={file} onRemove={() => removeFile(i)} />
          ))}
        </ul>
      )}

      <p className="text-sm text-muted">
        File di atas <strong className="text-ink">tidak otomatis terkirim</strong> — setelah submit, kami buka
        WhatsApp berisi ringkasan pesananmu supaya file desainnya bisa langsung kamu lampirkan di chat.
      </p>
    </div>
  );
}
