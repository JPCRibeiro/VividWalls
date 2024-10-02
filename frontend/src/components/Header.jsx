import { Link, NavLink, Outlet, ScrollRestoration, useNavigate } from "react-router-dom";
import Button from "./Button";
import { useContext } from "react";
import { UserContext } from "./UserProvider";
import axios from "axios";

export default function Header() {
  const { user, logout, isLoading } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout', {}, {
        withCredentials: true,
      });
      logout();
      navigate("/");
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return(
    <div className="w-full h-full">
      <header className="w-full fixed top-0 h-[60px] bg-[#0c0d0e] z-[200] flex items-center [box-shadow:inset_0_0_0_0px_rgba(31,_31,_31,_.66),_0_0_10px_rgba(0,_0,_0,_.75),_0_0_10px_rgba(0,_0,_0,_.75)] px-[40px] justify-between border-b-[1px] border-b-[rgba(31,31,31,.66)]">
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
        {!isLoading && ( 
          user ? (
            <div className="flex items-center gap-[12px]">
              <div className="flex text-white font-[500]">
                Bem-vindo,
                <span className="text-primary-color ml-[6px]">{user.username}</span>
              </div>
              <div>
                <Button text="Sair" color="green" onClick={handleLogout} />
              </div>
            </div>
          ) : (
            <div className="flex gap-[10px] font-[500] text-[#141618] text-[14px]">
              <Button as="Link" to="/cadastro" text="Cadastrar" color="green" />
              <Button as="Link" to="/login" text="Login" color="white" />
            </div>
          ))
        }
      </header>
      <ScrollRestoration/>
      <Outlet/>
    </div>
  )
}