import axios from "axios";

export async function homeImagesLoader() {
  try {
    const smallImages = await axios.get("/api/posts/small");
    const largeImages = await axios.get("/api/posts/large");

    return {
      smallImages: smallImages.data,
      largeImages: largeImages.data,
      error: null
    };
  } catch (error) {
    console.error("Erro ao carregar as imagens:", error);

    return {
      smallImages: null,
      largeImages: null,
      error: "Falha ao carregar as imagens. Por favor, tente novamente mais tarde.",
    };
  }
}
