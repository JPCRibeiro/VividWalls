import axios from "axios";

export async function recentImagesLoader() {
  try {
    const response = await axios.get("/api/posts/latest");
    return { 
      wallpapers: response.data, 
      error: null 
    };
  } catch (error) {
    console.error("Erro ao carregar as imagens:", error);

    return {
      wallpapers: [],
      error: "Falha ao carregar as imagens. Por favor, tente novamente mais tarde.",
    };
  }
}
