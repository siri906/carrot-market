import { z } from "zod";

export const productSchema = z.object({
  photo: z.string({
    required_error: "photo는 필수 입니다.",
  }),
  title: z.string({
    required_error: "title는 필수 입니다.",
  }),
  price: z.coerce.number({
    required_error: "price는 필수 입니다.",
  }),
  desc: z.string({
    required_error: "desc는 필수 입니다.",
  }),
});

// z.infer란 zod에 등록 되어 있는 타입을 가져올 수 있게함
export type ProductType = z.infer<typeof productSchema>;
