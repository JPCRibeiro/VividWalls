import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../components/Button";
import { faFaceSadCry } from "@fortawesome/free-regular-svg-icons";

export default function NotFoundPage() {
  return (
    <div className="flex w-full items-center justify-center min-h-[100vh] text-white flex-col p-[10px] text-center">
      <FontAwesomeIcon icon={faFaceSadCry} className="text-[40px] mb-[20px]" />
      <h2 className="text-white text-[42px] font-bold">
        Ops! A Página não foi encontrada.
      </h2>
      <p className="text-[20px]">
        Pesquise novamente ou volte para a página inicial.
      </p>
      <div className="mt-[30px]">
        <Button
          as="Link"
          to="/"
          text="Voltar para a página inicial"
          color="green"
        />
      </div>
    </div>
  );
}
