import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useContext } from "react";
import { UserContext } from "./UserProvider";
import axios from "axios";

export default function UserLogout({ isHomePage }) {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8080/api/logout', {}, {
        withCredentials: true,
      });
      logout();
      navigate("/");
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <div className="flex items-center gap-[12px]">
      <div className="flex text-white font-[500]">
        Bem-vindo,
        <span className="text-primary-color ml-[6px]">{user.username}</span>
      </div>
      <div>
        <Button text="Sair" color="green" onClick={handleLogout} />
      </div>
    </div>
  )
}