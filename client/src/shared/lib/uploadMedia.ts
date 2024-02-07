export interface MediaUpload {
  public_id: string;
  url: string;
}

export const uploadMedia = async (mediaFiles: any): Promise<MediaUpload[]> => {
  const newMedia = [];

  for (const file of mediaFiles) {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('cloud_name', 'dikxf2gos');
    formData.append('upload_preset', 'ghl7d6mx');

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dikxf2gos/upload',
      {
        method: 'POST',
        body: formData
      }
    );

    const data = await res.json();

    newMedia.push({
      public_id: data.public_id,
      url: data.secure_url
    });
  }
  return newMedia;
};
