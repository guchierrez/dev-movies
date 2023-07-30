import Link from "next/link";
import { Button } from "./Button";

export const UnloggedUser = () => {
  return (
    <div className="flex items-center gap-3">
      <Link href="/register">
        <Button>Cadastre-se</Button>
      </Link>
      <Link href="/login">
        <Button buttonType="primary">Entrar</Button>
      </Link>
    </div>
  );
};
