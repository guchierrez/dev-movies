import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z
    .string()
    .nonempty("Insira seu email")
    .email("Endereço de email inválido"),
  password: z.string().nonempty("Insira sua senha"),
});

export type TLoginFormValues = z.infer<typeof LoginFormSchema>;
