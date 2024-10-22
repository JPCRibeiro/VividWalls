export default function Footer({ isHomePage }) {
  return (
    <div className="flex justify-center px-[10px]">
      <p className={`text-[13px] text-center border-[1px] rounded-[3px] px-[.5em] py-[2px] ${isHomePage ? "text-[rgba(255,_255,_255,_.66)] mt-[30px] border-[rgba(255,255,255,0.49)]" : "text-[#777] border-[#222] mb-[30px]"}`}>Todas as imagens são propriedade de seus criadores originais © 2024 VividWalls</p>
    </div>
  )
}