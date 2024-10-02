import { Link } from "react-router-dom";

export default function SizeImage({ posts, imageSize, minIndex, maxIndex }) {
  return(
    <div className="max-w-[1560px] justify-center inline-flex flex-nowrap">
      {posts.slice(minIndex, maxIndex).map(post => (
        <span key={`post-${post.id}`} className="p-[4px]">
          <Link to={`/wp/${post.imageName.split(".")[0]}`}>
            <img 
              width={imageSize === "small" ? 300 : 432} 
              src={post.imageUrl} 
              alt={post.caption} 
              className="max-w-full rounded-[5px] inline-block [box-shadow:2px_2px_5px_rgba(0,_0,_0,_.5)] hover:brightness-[130%] hover:[box-shadow:2px_2px_8px_rgba(0,_0,_0,_.8)] [transition:.25s]"/>
          </Link>
        </span>
      ))}
    </div>
  )
}