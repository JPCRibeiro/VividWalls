import { Link, Navigate } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import { useContext } from "react";
import { UserContext } from "../components/UserProvider";

export default function RegisterPage() {
  const { user } = useContext(UserContext);

  return (
    <>
      {!user ? (
        <div className="p-[20px]">
          <RegisterForm/>
          <p className="text-white mt-[40px] text-center flex justify-center gap-[6px]">
            Já possui uma conta?
            <Link to="/login" className="hover:underline font-[500] text-primary-color">
              Faça Login
            </Link>
          </p>
        </div>
      ) : (
        <Navigate to="/" replace />
      )}
    </>
  );
}