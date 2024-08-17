import db from "@/lib/db";
import getSession from "@/lib/session";
import { formatToWon } from "@/lib/util";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getIsOwner(userId: number) {
  const session = await getSession();
  console.log("session", session);
  if (session.id) {
    return session.id === userId;
  }
  return false;
}

async function getProduct(id: number) {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
  console.log("product", product);
  return product;
}

export default async function ProductDetail({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  console.log("id", typeof id);
  const product = await getProduct(id);
  // const isOwner = await getIsOwner(product!.userId);
  // if (isNaN(id)) {
  //   return notFound();
  // }
  // if (!product) {
  //   return notFound();
  // }
  return (
    <div>
      <div className="relative aspect-square"></div>
      {/* NextJS의 Image는 이미지를 자동으로 최적화를 해 주어 성능을 향상시키고 빠른 로딩이 되도록 해 준다.
      하지만 외부 호스트의 이미지(다른 사이트의 이미지 링크 등)를 불러올 때는 보안 상의 이유로 이 기능이 허용되지 않는다.
      따라서 next.config.mjs에서 hostname들을 등록해 주어야 한다.
      (nextConfig > images > remotePatterns > hostname)
      */}
      {/* <Image fill className="object-cover" src={product.photo} alt={product.title} />
      </div>
      <div className="p-5 flex items-center gap-3 border-b border-neutral-700">
        <div className="size-10 overflow-hidden rounded-full">{product.user.avatar !== null ? <Image src={product.user.avatar} width={40} height={40} alt={product.user.username} /> : <UserIcon />}</div>
        <div>
          <h3>{product.user.username}</h3>
        </div>
      </div>
      <div className="p-5">
        <h1 className="text-2xl font-semibold">{product.title}</h1>
        <p>{product.desc}</p>
      </div>
      <div className="fixed w-full bottom-0 left-0 p-5 pb-10 bg-neutral-800 flex justify-between items-center">
        <span className="font-semibold text-xl">{formatToWon(Number(product.price))}원</span>
        {isOwner ? <button className="bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold">Delete product</button> : null}
        <Link className="bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold" href={``}>
          채팅하기
        </Link>
      </div> */}
    </div>
  );
}
