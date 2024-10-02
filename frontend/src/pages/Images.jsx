import { Link, useLoaderData } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function ImagesPage() {
  const { wallpapers, error } = useLoaderData();
  const imageRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.onload = () => {
              img.classList.add("loaded");
            };
            observer.unobserve(img);
          }
        });
      },
      { threshold: 0.3 }
    );

    imageRefs.current.forEach((img) => {
      if (img) {
        observer.observe(img);
      }
    });

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [wallpapers]);

  return (
    <>
      <div className="pt-[60px]">
        <div className="bg-[radial-gradient(400px_80px_at_0px_top,_rgba(3,227,184,.4),_transparent)] pl-[40px] pt-[20px] pr-[20px]">
          <h3 className="text-white text-[30px] font-bold [text-shadow:1px_2px_4px_#000]">
            Mais Recentes
          </h3>
          <p className="text-white font-[600]">
            Últimos wallpapers postados por nossos usuários!
          </p>
        </div>
      </div>
      <main className="p-[30px]">
        {error ? (
          <div className="text-white text-center text-[18px] font-[500] absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-full p-[20px]">{error}</div>
        ) : (
          <ul className="flex flex-wrap justify-center">
            {wallpapers.map((wallpaper, index) => (
              <li key={`post-${wallpaper.id}`} className="inline-block">
                <div className="w-[300px] h-[200px] m-[10px] rounded-[3px] relative inline-block align-middle">
                  <Link to={`/wp/${wallpaper.imageName.split(".")[0]}`}>
                    <img
                      ref={(e) => (imageRefs.current[index] = e)}
                      data-src={wallpaper.imageUrl}
                      alt={wallpaper.caption}
                      className="w-full h-full absolute z-[90] block rounded-[3px] select-none lazyload"
                    />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
