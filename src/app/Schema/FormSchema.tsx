import { z } from "zod";

const acceptedFileTypes = ["image/jpeg", "image/png", "application/pdf"];

export const formSchema = z.object({
  title: z.string().min(1, { error: "O título é obrigatório" }),
  category: z.string().min(1, { message: "A categoria é obrigatória" }),
  value: z.number().min(1, { message: "O valor deve ser maior que zero",}),
  receipt: z
    .instanceof(File, { message: "O comprovante é obrigatório" })
    .refine(
      (file) => acceptedFileTypes.includes(file.type),
      "Apenas PDF, JPEG ou PNG são aceitos",
    ),
});

export type RefundFormData = z.infer<typeof formSchema>;
