import { LoginForm } from "./LoginForm";
import { ModalHeader } from "../general/ModalHeader";

export const LoginModal = () => {
  return (
    <div className="absolute flex flex-col w-5/6 gap-10 p-8 translate-x-1/2 translate-y-1/2 bg-base-200 h-fit sm:w-2/3 md:w-1/2 xl:w-[30%] right-1/2 bottom-1/2 xl:bottom-2/3 xl:right-3/4 xl:translate-x-3/4 xl:translate-y-2/3">
      <ModalHeader title="Login" />
      <LoginForm />
    </div>
  );
};
