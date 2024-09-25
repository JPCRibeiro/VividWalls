import { Link, NavLink, Outlet } from "react-router-dom";

export default function Header() {
  return(
    <div className="flex flex-col">
      <header className="fixed top-0 h-[60px] w-full bg-[#141618] z-[200] flex items-center [box-shadow:inset_0_0_0_1px_rgba(31,_31,_31,_.66),_0_0_10px_rgba(0,_0,_0,_.75),_0_0_10px_rgba(0,_0,_0,_.75)] px-[40px] justify-between">
        <div className="flex items-center h-full">
          <Link to="/" className="flex">
            <h2 className="font-bold text-white text-[28px] select-none title">VividWalls</h2>
          </Link>
          <div className="flex gap-[20px] text-[18px] text-white ml-[24px] h-full">
            <NavLink to="recentes" className={({ isActive }) => `flex items-center relative after:content-[''] after:absolute after:w-full after:h-[4px] after:bottom-0 after:bg-[#03E3B8] after:origin-left ${isActive ? "" : "after:scale-x-[0] hover:after:scale-x-[1] after:[transition:transform_0.15s_ease-in] hover:after:origin-left"}`}>
              Recentes
            </NavLink>
            <NavLink to="upload" className={({ isActive }) => `flex items-center relative after:content-[''] after:absolute after:w-full after:h-[4px] after:bottom-0 after:bg-[#03E3B8] after:origin-left ${isActive ? "" : "after:scale-x-[0] hover:after:scale-x-[1] after:[transition:transform_0.15s_ease-in] hover:after:origin-left"}`}> 
              Upload
            </NavLink>
          </div>
        </div>
        <div className="flex gap-[10px] font-[500] text-[#141618] text-[14px]">
          <button className="py-[6px] px-[10px] rounded-[5px] bg-[#03E3B8] shadow-[0_3px_0_#028b71] active:shadow-none active:translate-y-[2px]">
            Cadastrar
          </button> 
          <button className="py-[6px] px-[14px] rounded-[5px] bg-white shadow-[0_3px_0_#afafaf] active:shadow-none active:translate-y-[2px]">
            Login
          </button>
        </div>
      </header>
      <Outlet/>
    </div>
  )
}

/* #212427*/