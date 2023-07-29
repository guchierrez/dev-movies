import { ModalHeader } from "./ModalHeader";
import { RegisterForm } from "./RegisterForm";

export const RegisterModal = () => {
  return (
    <div className="absolute flex flex-col w-5/6 gap-5 p-8 translate-x-1/2 translate-y-1/2 bg-base-200 h-fit sm:w-2/3 md:w-1/2 right-1/2 bottom-1/2">
      <ModalHeader title="Cadastro" />
      <p className="font-roboto">Preencha os campos para cadastrar-se</p>
      <RegisterForm />
    </div>
  );
};
