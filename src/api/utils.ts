export const getMediaUrl = (media: {
  data: { attributes: { url: string } };
}) => {
  return `${import.meta.env.VITE_API_URL}${media.data.attributes.url}`;
};
