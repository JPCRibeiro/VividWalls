import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ImagePage() {
  const { imageName } = useParams(); 
  const [post, setPost] = useState(""); 

  useEffect(() => {
    async function fetchPost() {
      try {
        const result = await axios.get(`/api/posts/${imageName}`);
        setPost(result.data); 
      } catch (error) {
        console.error("Erro ao buscar imagem:", error);
      } 
    }

    fetchPost();
  }, [imageName]);

  return (
    <main className="h-[100vh] border-t-[50px] flex flex-col justify-center items-center">
      <img src={post.imageUrl} alt={post.caption} className="max-w-[95%] max-h-[95%]"/>
    </main>
  );
}