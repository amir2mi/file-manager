import getFileType from "@utils/file-type";
import { AudioSquare, DocumentText1, Folder, Image, VideoPlay } from "iconsax-react";

export default function FileTypeIcon({ title }: { title: string }) {
  const type = getFileType(title);

  switch (type) {
    case "image":
      return <Image size="20" />;
    case "audio":
      return <AudioSquare size="20" />;
    case "video":
      return <VideoPlay size="20" />;
    case "document":
      return <DocumentText1 size="20" />;
    case "folder":
      return <Folder size="20" />;
  }
}
