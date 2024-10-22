import axios from "axios";

export async function queryImagesLoader({ request }) {
  const url = new URL(request.url); 
  const query = url.searchParams.get("q");

  try {
    const response = await axios.get(`/api/posts/query`, {
      params: { caption: query }, 
    });
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
