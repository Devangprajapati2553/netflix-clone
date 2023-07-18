export const createImageUrl = (path: string) => {
    return `${import.meta.env.VITE_BASE_IMAGE_URL}${path} ` 
  };
