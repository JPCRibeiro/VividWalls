import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import InputComponent from "../components/Input";
import Button from "../components/Button";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .trim()
      .min(3, "O nome de usuário deve ter pelo menos 3 caracteres")
      .required("Nome de usuário é obrigatório"),
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
      username: username.trim(),
      email: email.trim(),
      password: password.trim(),
    };

    try {
      await validationSchema.validate(formValues, { abortEarly: false });

      setUsernameError(null);
      setEmailError(null);
      setPasswordError(null);

      await axios.post("/api/register", formValues);

      navigate("/recentes");
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          if (error.path === "username") {
            setUsernameError(error.message);
          } else if (error.path === "email") {
            setEmailError(error.message);
          } else if (error.path === "password") {
            setPasswordError(error.message);
          }
        });
      } else {
        console.error("Erro ao registrar usuário:", err);
      }
    }
  };

  return (
    <form
      onSubmit={submit}
      className="flex flex-col max-w-[600px] m-auto p-[30px] pb-[20px] bg-[#15161a] shadow-[1px_10px_15px_rgba(0,_0,_0,_.7)] rounded-[5px] mt-[100px] border-t-[2px] border-t-primary-color"
    >
      <h1 className="text-center text-white font-bold text-[46px] title leading-[48px] mb-[20px]">
        VividWalls
      </h1>
      <h2 className="text-white relative text-[24px] font-[500] mb-[30px] w-fit pb-[6px] after:absolute after:content-[''] after:left-0 after:bottom-0 after:w-[110%] after:border-[2px] after:border-primary-color">
        Criar Conta
      </h2>
      <InputComponent
        id="username"
        title={username}
        setTitle={setUsername}
        type="text"
        label="Nome de usuário"
        autocomplete="username"
        error={usernameError}
        setError={setUsernameError}
      />
      <InputComponent
        id="email"
        title={email}
        setTitle={setEmail}
        type="text"
        label="E-mail"
        autocomplete="email"
        error={emailError}
        setError={setEmailError}
      />
      <InputComponent
        id="password"
        title={password}
        setTitle={setPassword}
        type="password"
        label="Senha"
        autocomplete="current-password"
        error={passwordError}
        setError={setPasswordError}
      />
      <div className="mt-[10px]">
        <Button type="submit" text="Criar" color="green" />
      </div>
      <p className="text-white text-center text-[13px] mt-[20px]">
        Ao criar sua conta, você concorda com nossos Termos de Serviço e
        Política de Privacidade.
      </p>
    </form>
  );
}
