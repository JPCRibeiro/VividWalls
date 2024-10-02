import axios from "axios";
import Button from "../components/Button";
import InputComponent from "../components/Input";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/UserProvider";
import * as Yup from "yup";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const navigate = useNavigate();
  const { fetchUserData } = useContext(UserContext);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .email("Insira um email válido")
      .required("Email é obrigatório"),
    password: Yup.string()
      .trim()
      .min(6, "A senha deve ter pelo menos 6 caracteres")
      .required("Senha é obrigatória"),
  });

  const submit = async (e) => {
    e.preventDefault();

    const formValues = {
      email: email.trim(),
      password: password.trim(),
    };

    try {
      await validationSchema.validate(formValues, { abortEarly: false });

      setEmailError(null);
      setPasswordError(null);

      const response = await axios.post("/api/login", formValues, {
        withCredentials: true,
      });

      if (response.status === 200) {
        await fetchUserData();
        navigate("/");
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach((error) => {
          if (error.path === "email") {
            setEmailError(error.message);
          } else if (error.path === "password") {
            setPasswordError(error.message);
          }
        });
      } else {
        console.error("Erro ao fazer login:", error);
      }
    }
  };

  return (
    <form
      onSubmit={submit}
      className="flex flex-col max-w-[600px] mx-auto p-[30px] bg-[#15161a] shadow-[1px_10px_15px_rgba(0,_0,_0,_.7)] rounded-[5px] mt-[100px] border-t-[2px] border-t-primary-color"
    >
      <h1 className="text-center text-white font-bold text-[46px] title leading-[48px] mb-[20px]">
        VividWalls
      </h1>
      <h2 className="text-white relative text-[24px] font-[500] mb-[30px] w-fit pb-[6px] after:absolute after:content-[''] after:left-0 after:bottom-0 after:w-[110%] after:border-[2px] after:border-primary-color">
        Fazer Login
      </h2>
      <InputComponent
        id="email"
        title={email}
        setTitle={setEmail}
        type="text"
        isLoginPage
        label="E-mail"
        autocomplete="email"
        icon={faUser}
        error={emailError}
        setError={setEmailError}
      />
      <InputComponent
        id="password"
        title={password}
        setTitle={setPassword}
        type="password"
        isLoginPage
        label="Senha"
        autocomplete="current-password"
        icon={faLock}
        error={passwordError}
        setError={setPasswordError}
      />
      <div className="mt-[10px]">
        <Button type="submit" text="Entrar" color="green" />
      </div>
    </form>
  );
}
