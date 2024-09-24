import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SizeImage({imageSize, imageWidth, minIndex, maxIndex}) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      const result = await axios.get(`/api/posts/${imageSize}`)
      setPosts(result.data)
    }
    getPosts()
  }, [imageSize])

  return(
    <div className="max-w-[1560px] justify-center inline-flex flex-nowrap">
      {posts.slice(minIndex, maxIndex).map(post => (
        <span key={`post-${post.id}`} className="p-[6px]">
          <Link to={`/wallpapers/${post.imageName}`}>
            <img width={imageWidth} src={post.imageUrl} alt={post.caption} className="max-w-full rounded-[5px] inline-block [box-shadow:2px_2px_5px_rgba(0,_0,_0,_.5)] hover:brightness-[130%] hover:[box-shadow:2px_2px_8px_rgba(0,_0,_0,_.8)] [transition:.25s]"/>
          </Link>
        </span>
      ))}
    </div>
  )
}