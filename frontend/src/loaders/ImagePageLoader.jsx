import axios from "axios";

export async function imagePageLoader({ params }) {
  const { imageName } = params;

  try {
    const response = await axios.get(`/api/posts/${imageName}`);
    return {
      wallpaper: response.data,
      error: null 
    };
  } catch (error) {
    return { 
      wallpaper: null, 
      error: "Falha ao carregar a imagem. Por favor, tente novamente mais tarde."
    };
  } 
}
