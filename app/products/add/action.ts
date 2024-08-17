"use server";

import { title } from "process";

export async function uploadProduct(formData: FormData) {
  const data = {
    photo: formData.get("photo"),
    title: formData.get("title"),
    price: formData.get("price"),
    desc: formData.get("desc"),
  };

  // console.log("data", data);
}
