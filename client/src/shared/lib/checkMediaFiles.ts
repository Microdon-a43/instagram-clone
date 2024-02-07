export const checkMediaFiles = (files: File[]) => {
  let err = '';
  let newMedia: File[] = [];

  files.forEach((file) => {
    if (!file) return (err = 'Выберите файл');

    if (
      file.type !== 'image/jpg' &&
      file.type !== 'image/jpeg' &&
      file.type !== 'image/png' &&
      file.type !== 'video/mkv' &&
      file.type !== 'video/mov' &&
      file.type !== 'video/mp4' &&
      file.size > 1024 * 1024 * 5
    ) {
      return (err = 'Выберите подходящий формат файла');
    }

    newMedia.push(file);
  });
  return {
    err,
    newMedia
  };
};
