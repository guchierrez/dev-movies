import { z } from "zod";

export const RegisterFormSchema = z
  .object({
    name: z
      .string()
      .nonempty("Insira seu nome")
      .min(3, "Seu nome precisa ter mais de 3 caracteres"),
    email: z
      .string()
      .nonempty("Insira seu email")
      .email("Endereço de email inválido"),
    password: z
      .string()
      .min(8, "A senha precisa conter pelo menos 8 caracteres")
      .regex(/(?=.*?[A-Z])/, "É necessário pelo menos uma letra maiúscula")
      .regex(/(?=.*?[a-z])/, "É necessário pelo menos uma letra minúscula")
      .regex(/(?=.*?[0-9])/, "É necessário pelo menos um número")
      .regex(
        /(?=.?[!@#$%^&])/,
        "É necessário pelo menos um caractere especial"
      ),
    confirm: z.string().min(1, "Confirme sua senha"),
  })
  .refine(({ password, confirm }) => confirm === password, {
    message: "As senhas não correspondem",
    path: ["confirm"],
  });

export type TRegisterFormValues = z.infer<typeof RegisterFormSchema>;
