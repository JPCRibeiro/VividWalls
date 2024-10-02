import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../components/UserProvider";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  const { user } = useContext(UserContext);

  return (
    <>
      {!user ? (
        <div className="p-[20px]">
          <LoginForm/>
          <p className="text-white mt-[40px] text-center flex justify-center gap-[6px]">
            Ainda não possui uma conta?
            <Link to="/cadastro" className="hover:underline font-[500] text-primary-color">
              Crie Agora
            </Link>
          </p>
        </div>
      ) : (
        <Navigate to="/" replace />
      )}
    </>
  );
}
