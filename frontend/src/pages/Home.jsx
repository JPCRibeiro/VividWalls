import { Link } from "react-router-dom";
import SizeImage from "../components/SizeImages";

export default function HomePage() {
  return(
    <main className="p-[30px] min-w-[800px] min-h-full max-w-[1560px] m-auto flex flex-col justify-center items-center">
      <Link to="/" className="flex w-fit">
        <h1 className="text-center text-white font-bold text-[46px] title w-fit leading-[48px]">VividWalls</h1>
      </Link>
      <div className="text-center my-[30px] rounded-[10px] flex items-center border-[1px] border-[rgba(255,255,255,0.06)] shadow-[0_8px_32px_0_rgba(0,_0,_0,_0.37)] bg-[rgba(255,255,255,0)]">
        <Link to="recentes" className="flex text-white text-[20px] font-bold [transition:.15s] py-[20px] px-[20px]">Recentes</Link>
        <div className="w-[1px] h-[50px] bg-[rgba(255,255,255,0.06)]"></div>
        <Link to="upload" className="flex text-white text-[20px] font-bold [transition:.15s] py-[20px] px-[20px]">Upload</Link>
      </div>
      <SizeImage imageSize="small" imageWidth={300} minIndex={0} maxIndex={6}/>
      <SizeImage imageSize="large" imageWidth={432} minIndex={6} maxIndex={11}/>
      <SizeImage imageSize="small" imageWidth={300} minIndex={11} maxIndex={17}/>
      <SizeImage imageSize="large" imageWidth={432} minIndex={18} maxIndex={23}/>
    </main>
  )
}