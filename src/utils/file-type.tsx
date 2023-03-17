// checks file name to find common file extensions and say if it is a file or folder
export default function getFileType(title: string) {
  const imageRegex = /\.(jpg|jpeg|png|gif|svg)$/i;
  const audioRegex = /\.(mp3|wav|ogg|flac)$/i;
  const videoRegex = /\.(mp4|mov|avi|wmv|3gp|mkv)$/i;
  const documentRegex = /\.(doc|docx|pdf|txt|js|jsx|ts|tsx|css|sass|scss|html|py)$/i;

  if (imageRegex.test(title)) {
    return "image";
  } else if (audioRegex.test(title)) {
    return "audio";
  } else if (videoRegex.test(title)) {
    return "video";
  } else if (documentRegex.test(title)) {
    return "document";
  } else {
    return "folder";
  }
}
