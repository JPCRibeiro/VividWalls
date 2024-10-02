import { useLoaderData } from "react-router-dom";
import Button from "../components/Button";

export default function ImagePage() {
  const { wallpaper, error } = useLoaderData();

  return (
    <>
    {error ? (
      <div className="text-white text-center text-[18px] font-[500] absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-full p-[20px]">{error}</div>
    ) : (
      <>
        <aside className="fixed left-0 z-[150] top-[60px] max-w-[280px] w-full h-full overflow-visible bg-[#0c0d0e] [box-shadow:0_0_7px_rgba(0,_0,_0,_1)] border-[#29292971] border-[1px]">
          <div className="p-[20px] text-center">
            <div className="text-white mb-[20px]">
              <h3 className="font-bold text-[22px]">Descrição</h3>
              <p>{wallpaper.caption}</p>
            </div>
            <div className="text-white mb-[20px]">
              <h3 className="font-bold text-[22px]">Resolução</h3>
              <p>
                {wallpaper.width} x {wallpaper.height}
              </p>
            </div>
            <div className="mt-[20px] flex justify-center w-full">
              <Button text="Download" color="green" />
            </div>
          </div>
        </aside>
        <main className="relative min-h-full min-w-[800px] border-t-[60px] ml-[280px]">
          <section className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0">
              <img
                src={wallpaper.imageUrl}
                alt={wallpaper.caption}
                className="max-w-[95%] max-h-[95%] m-auto absolute inset-0 block"
              />
            </div>
          </section>
        </main>
      </>
      )}
    </>
  );
}
