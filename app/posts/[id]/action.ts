"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { revalidateTag } from "next/cache";

export const likePost = async (postId: number) => {
  await new Promise((r) => setTimeout(r, 5000));
  const sesstion = await getSession();
  try {
    await db.like.create({
      data: {
        postId,
        userId: sesstion.id!,
      },
    });
    //클릭하면 조회수까지 같이 늘어나는 문제가 생김 cache 된 데이터 활용하기 위해 tag사용
    // revalidatePath(`/post/${id}`);
    revalidateTag(`like-status-${postId}`);
  } catch (error) {}
};

export const dislikePost = async (postId: number) => {
  await new Promise((r) => setTimeout(r, 5000));
  const sesstion = await getSession();
  try {
    await db.like.delete({
      where: {
        id: {
          postId,
          userId: sesstion.id!,
        },
      },
    });
    revalidateTag(`like-status-${postId}`);
  } catch (error) {}
};
