type dimention = "width"| "original"

export const createImageUrl = (path: string,width:number, type:dimention="width") => {
    return type === "width" ?
      `${import.meta.env.VITE_BASE_IMAGE_URL}/w${width}${path}`
    : `${import.meta.env.VITE_BASE_IMAGE_URL}/${type}${path}` 
  };




export const createVideoUrlById= (movieId:number)=>{
  return `${import.meta.env.VITE_BASE_API}/movie/${movieId}`
}