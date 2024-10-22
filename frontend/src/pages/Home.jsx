import { Link, ScrollRestoration, useLoaderData } from "react-router-dom";
import SizeImage from "../components/SizeImages";
import { UserContext } from "../components/UserProvider";
import { useContext } from "react";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
import UserLogout from "../components/UserLogout";

export default function HomePage() {
  const { smallImages, largeImages, error } = useLoaderData();
  const { user } = useContext(UserContext);

  return (
    <main className={`p-[30px] homepage ${user ? "pt-[0px]" : ""}`}>
      {user && (
        <header className="flex items-center justify-end text-white font-[500] h-[60px] pr-[10px] absolute right-[30px]">
          <UserLogout/>
        </header>
      )}
      <div className={`min-w-[800px] min-h-full max-w-[1560px] mx-auto flex flex-col items-center ${user && "pt-[30px]"}`}>
        <Link to="/" className="flex w-fit select-none">
          <h1 className="text-center text-white font-bold text-[46px] title w-fit leading-[48px]">
            VividWalls
          </h1>
        </Link>
        <p className="text-white text-[18px]">
          Poste e compartilhe suas artes e wallpapers para inspirar a comunidade!
        </p>
        <div className="text-center mt-[30px] mb-[20px] rounded-[10px] flex items-center shadow-[rgba(0,_0,_0,_0.6)_0px_2px_4px] bg-[rgba(20,20,20,0.59)] text-white text-[20px] font-[500]">
          <Link to="recentes" className="flex py-[20px] px-[20px]">
            Recentes
          </Link>
          <div className="w-[1px] h-[50px] bg-[rgba(255,255,255,0.06)]"></div>
          <Link to="upload" className="flex py-[20px] px-[20px]">
            Upload
          </Link>
        </div>
        <SearchBar isHomePage/>
        {error ? (
          <div className="text-white mb-[20px] text-[18px] font-[500]">{error}</div>
        ) : (
          <>
            {smallImages && (
              <SizeImage posts={smallImages} imageSize="small" minIndex={0} maxIndex={6} />
            )}
            {largeImages && (
              <SizeImage posts={largeImages} imageSize="small" minIndex={6} maxIndex={11} />
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
              <SizeImage posts={largeImages} imageSize="small" minIndex={17} maxIndex={22} />
            )}
          </>
        )}
      </div>
      <ScrollRestoration />
      <Footer isHomePage/>
    </main>
  );
}
