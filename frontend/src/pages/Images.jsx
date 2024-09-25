import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ImagesPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      const result = await axios.get("/api/posts/latest");
      setPosts(result.data);
    }
    getPosts()
  }, []);

  return(
    <>
      <div className="bg-[radial-gradient(400px_80px_at_0px_top,_rgba(3,227,184,.4),_transparent)] pl-[40px] pt-[20px] mt-[60px]">
        <h3 className="text-white text-[30px] font-bold [text-shadow:1px_2px_4px_#000]">Mais Recentes</h3>
        <p className="text-white font-[600]">
          Últimos wallpapers postados por nossos usuários!
        </p>
      </div>
      <main className="p-[30px]">
        <ul className="flex flex-wrap justify-center"> 
          {posts.map(post => (
            <li key={`post-${post.id}`} className="inline-block">
              <div className="w-[300px] h-[200px] m-[10px] rounded-[3px] relative inline-block align-middle [box-shadow:0_0_4px_rgba(0,_0,_0,_.8)]">
                <Link to={`/wp/${post.imageName.split('.')[0]}`}>
                  <img src={post.imageUrl} alt={post.caption} className="w-full h-full absolute z-[90] block rounded-[3px] select-none"/>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </>
  ) 
}