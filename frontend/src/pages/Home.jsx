import { Link, ScrollRestoration, useLoaderData } from "react-router-dom";
import SizeImage from "../components/SizeImages";
import { UserContext } from "../components/UserProvider";
import { useContext } from "react";

export default function HomePage() {
  const { smallImages, largeImages, error } = useLoaderData();
  const { user } = useContext(UserContext);

  return (
    <main className={`p-[30px] homepage ${user ? "pt-[0px]" : ""}`}>
      {user && (
        <header className="flex items-center justify-end text-white font-[500] h-[60px] pr-[10px]">
          Bem-vindo,
          <span className="text-primary-color ml-[6px]">{user.username}</span>
        </header>
      )}
      <div className="min-w-[800px] min-h-full max-w-[1560px] m-auto flex flex-col items-center">
        <Link to="/" className="flex w-fit select-none">
          <h1 className="text-center text-white font-bold text-[46px] title w-fit leading-[48px]">
            VividWalls
          </h1>
        </Link>
        <div className="text-center my-[30px] rounded-[10px] flex items-center border-[1px] border-[rgba(255,255,255,0.06)] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] bg-[rgba(20,20,20,0.59)]">
          <Link to="recentes" className="flex text-white text-[20px] font-bold [transition:.15s] py-[20px] px-[20px]">
            Recentes
          </Link>
          <div className="w-[1px] h-[50px] bg-[rgba(255,255,255,0.06)]"></div>
          <Link to="upload" className="flex text-white text-[20px] font-bold [transition:.15s] py-[20px] px-[20px]">
            Upload
          </Link>
        </div>
        {error ? (
          <div className="text-white mb-[20px] text-[18px] font-[500]">{error}</div>
        ) : (
          <>
            {smallImages && (
              <SizeImage posts={smallImages} imageSize="small" minIndex={0} maxIndex={6} />
            )}
            {largeImages && (
              <SizeImage posts={largeImages} imageSize="large" minIndex={6} maxIndex={11} />
            )}
          </>
        )}
        {!user && (
          <div className="bg-[linear-gradient(to_right,_rgba(0,_0,_0,_0)_0,_rgba(0,_0,_0,_.3)_10%,_rgba(0,_0,_0,_.3)_90%,_rgba(0,_0,_0,_0)_100%)] w-full px-[10px] py-[20px] my-[4px] text-white flex gap-[6px] justify-center">
            Também deseja postar wallpapers?
            <Link to="/cadastro" className="hover:underline font-[500] text-primary-color">
              Crie uma conta
            </Link>
            ou
            <Link to="/login" className="hover:underline font-[500] text-primary-color">
              Faça login
            </Link>
          </div>
        )}
        {!error && (
          <>
            {smallImages && (
              <SizeImage posts={smallImages} imageSize="small" minIndex={11} maxIndex={17} />
            )}
            {largeImages && (
              <SizeImage posts={largeImages} imageSize="large" minIndex={17} maxIndex={22} />
            )}
          </>
        )}
      </div>
      <ScrollRestoration />
    </main>
  );
}
