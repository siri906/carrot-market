"use server";
import { z } from "zod";
import validator from "validator";

const phoneSchema = z.string().trim().refine(validator.isMobilePhone);

const tokenSchema = z.coerce.number().min(1000000).max(9999999);

export const smsLogin = async (prevData: any, formData: FormData) => {
  console.log(formData.get("token"));
  console.log("tokenSchema", tokenSchema.parse(formData.get("token")));
};
