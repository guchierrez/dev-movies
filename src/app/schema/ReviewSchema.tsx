import { z } from "zod";

export const ReviewFormSchema = z.object({
  score: z.string().nonempty("Escolha uma nota para sua avaliação"),
  description: z.string().nonempty("Insira sua opinião sobre o filme"),
});

export type TReviewFormValues = z.infer<typeof ReviewFormSchema>;
