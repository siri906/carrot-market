"use server";

import { z } from "zod";
import fs from "fs/promises";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const productSchema = z.object({
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

export async function uploadProduct(formData: FormData) {
  const data = {
    photo: formData.get("photo"),
    title: formData.get("title"),
    price: formData.get("price"),
    desc: formData.get("desc"),
  };

  if (data.photo instanceof File) {
    // 파일을 쪼개서 바이트로 보관해주는 것
    const photoData = await data.photo.arrayBuffer();
    // console.log("photoData", photoData);
    // 우선적으로 그냥 우리 로컬에 설치하는 방법
    await fs.appendFile(`./public/1)${data.photo.name}`, Buffer.from(photoData));
    data.photo = `/1)${data.photo.name}`;
  }

  const result = productSchema.safeParse(data);

  console.log("result>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", result.error?.flatten());
  if (!result.success) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      const productItem = await db.product.create({
        data: {
          title: result.data.title,
          desc: result.data.desc,
          price: result.data.price,
          photo: result.data.photo,
          user: {
            connect: {
              id: session.id,
            },
          },
        },
        select: {
          id: true,
        },
      });

      // 2가지 방법
      redirect(`/products/${productItem.id}`);
      // redirect("/products");
      // console.log("product", productItem);
    }
  }

  // console.log("data", data);
}
