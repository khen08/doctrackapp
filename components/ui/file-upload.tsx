import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { IconUpload } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";
import { ScrollArea } from "@/components/ui/scroll-area";
import mime from "mime";

// Define user-friendly MIME type descriptions
const mimeDescriptions: Record<string, string> = {
  "audio/aac": "AAC Audio File",
  "application/x-abiword": "AbiWord Document",
  "image/apng": "Animated PNG Image",
  "application/x-freearc": "Compressed Archive File",
  "image/avif": "AVIF Image File",
  "video/x-msvideo": "AVI Video File",
  "application/vnd.amazon.ebook": "Kindle eBook",
  "application/octet-stream": "Binary File",
  "image/bmp": "Bitmap Image",
  "application/x-bzip": "BZip Archive",
  "application/x-bzip2": "BZip2 Archive",
  "application/x-cdf": "CD Audio",
  "application/x-csh": "C-Shell Script",
  "text/css": "Stylesheet File",
  "text/csv": "CSV File",
  "application/msword": "Microsoft Word Document",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "Microsoft Word Document",
  "application/vnd.ms-fontobject": "Embedded Font",
  "application/epub+zip": "EPUB eBook",
  "application/gzip": "GZip Archive",
  "image/gif": "GIF Image",
  "text/html": "HTML Web Page",
  "image/vnd.microsoft.icon": "Icon File",
  "text/calendar": "Calendar File",
  "application/java-archive": "Java Archive File",
  "image/jpeg": "JPEG Image",
  "text/javascript": "JavaScript File",
  "application/json": "JSON Data",
  "application/ld+json": "JSON-LD Data",
  "audio/midi": "MIDI Music File",
  "audio/x-midi": "MIDI Music File",
  "audio/mpeg": "MP3 Music File",
  "video/mp4": "MP4 Video File",
  "video/mpeg": "MPEG Video File",
  "application/vnd.apple.installer+xml": "Apple Installer Package",
  "application/vnd.oasis.opendocument.presentation":
    "OpenDocument Presentation",
  "application/vnd.oasis.opendocument.spreadsheet": "OpenDocument Spreadsheet",
  "application/vnd.oasis.opendocument.text": "OpenDocument Text Document",
  "audio/ogg": "Ogg Audio File",
  "video/ogg": "Ogg Video File",
  "application/ogg": "Ogg File",
  "font/otf": "OpenType Font",
  "image/png": "PNG Image",
  "application/pdf": "PDF Document",
  "application/x-httpd-php": "PHP Script",
  "application/vnd.ms-powerpoint": "Microsoft PowerPoint Presentation",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation":
    "PowerPoint",
  "application/vnd.rar": "RAR Archive",
  "application/rtf": "Rich Text File",
  "application/x-sh": "Shell Script",
  "image/svg+xml": "SVG Image",
  "application/x-tar": "TAR Archive",
  "image/tiff": "TIFF Image",
  "video/mp2t": "MPEG Transport Stream",
  "font/ttf": "TrueType Font",
  "text/plain": "Text File",
  "application/vnd.visio": "Microsoft Visio Document",
  "audio/wav": "WAV Audio File",
  "audio/webm": "WEBM Audio File",
  "video/webm": "WEBM Video File",
  "image/webp": "WEBP Image",
  "font/woff": "Web Font (WOFF)",
  "font/woff2": "Web Font (WOFF2)",
  "application/xhtml+xml": "XHTML Web Page",
  "application/vnd.ms-excel": "Microsoft Excel Spreadsheet",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "Excel",
  "application/xml": "XML File",
  "application/vnd.mozilla.xul+xml": "XUL File",
  "application/zip": "ZIP Archive",
  "video/3gpp": "3GPP Audio/Video File",
  "video/3gpp2": "3GPP2 Audio/Video File",
  "application/x-7z-compressed": "7-Zip Archive",
  // Add more MIME types and descriptions as needed
};

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

const uploadFiles = async (files: File[]) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Upload failed");
  }

  return response.json();
};

export const FileUpload = ({
  onChange,
}: {
  onChange?: (files: File[]) => void;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (newFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    onChange && onChange(newFiles);
    uploadFiles(newFiles)
      .then(() => {
        console.log("Files uploaded successfully");
      })
      .catch((error) => {
        console.error("Upload error:", error);
      });
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: true,
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="min-h-[500px] w-full" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="p-10 min-h-[500px] group/file rounded-lg cursor-pointer w-full relative overflow-hidden flex items-center justify-center"
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          multiple
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
          <GridPattern />
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="relative z-20 font-sans font-bold text-neutral-700 dark:text-neutral-300 text-base">
            Upload file
          </p>
          <p className="relative z-20 font-sans font-normal text-neutral-400 dark:text-neutral-400 text-base mt-2">
            Drag or drop your files here or click to upload
          </p>
          <div className="relative w-full mt-10 max-w-xl mx-auto">
            {files.length > 0 && (
              <ScrollArea className="h-96 max-w p-2 border border-gray-200 rounded-md bg-gray-50 dark:bg-neutral-800">
                {files.map((file, idx) => {
                  // Get the MIME type from the file
                  const mimeType =
                    mime.getType(file.name) || "Unknown MIME type";
                  // Get the file description from MIME type
                  const fileDescription =
                    mimeDescriptions[mimeType] || "Unknown";
                  return (
                    <motion.div
                      key={"file" + idx}
                      className={cn(
                        "relative overflow-hidden z-40 bg-white dark:bg-neutral-900 flex flex-col items-start justify-start md:h-28 p-4 mt-4 w-full mx-auto rounded-md",
                        "shadow-sm"
                      )}
                    >
                      <div className="flex justify-between w-full items-center gap-4">
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          layout
                          className="text-base text-neutral-700 dark:text-neutral-300 truncate max-w-xs"
                        >
                          {file.name}
                        </motion.p>
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          layout
                          className="rounded-lg px-2 py-1 w-fit flex-shrink-0 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-white shadow-input"
                        >
                          {parseFloat((file.size / (1024 * 1024)).toFixed(3))}{" "}
                          MB
                        </motion.p>
                      </div>

                      <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-neutral-600 dark:text-neutral-400">
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          layout
                          className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 "
                        >
                          {fileDescription}
                        </motion.p>

                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          layout
                        >
                          modified{" "}
                          {new Date(file.lastModified).toLocaleDateString()}
                        </motion.p>
                      </div>
                    </motion.div>
                  );
                })}
              </ScrollArea>
            )}
            {!files.length && (
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className={cn(
                  "relative group-hover/file:shadow-2xl z-40 bg-white dark:bg-neutral-900 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md",
                  "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
                )}
              >
                {isDragActive ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-neutral-600 flex flex-col items-center"
                  >
                    Drop it
                    <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                  </motion.p>
                ) : (
                  <IconUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                )}
              </motion.div>
            )}

            {!files.length && (
              <motion.div
                variants={secondaryVariant}
                className="absolute opacity-0 border border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md"
              ></motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export function GridPattern() {
  const columns = 41;
  const rows = 11;
  return (
    <div className="flex bg-gray-100 dark:bg-neutral-900 flex-shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px  scale-105">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={`w-10 h-10 flex flex-shrink-0 rounded-[2px] ${
                index % 2 === 0
                  ? "bg-gray-50 dark:bg-neutral-950"
                  : "bg-gray-50 dark:bg-neutral-950 shadow-[0px_0px_1px_3px_rgba(255,255,255,1)_inset] dark:shadow-[0px_0px_1px_3px_rgba(0,0,0,1)_inset]"
              }`}
            />
          );
        })
      )}
    </div>
  );
}
