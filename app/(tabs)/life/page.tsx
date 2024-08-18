import db from "@/lib/db";
import { formatToTimeAgo } from "@/lib/util";
import { ChatBubbleBottomCenterIcon, HandThumbUpIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

async function getPosts() {
  // await new Promise((r) => setTimeout(r, 100000));
  const posts = await db.post.findMany({
    select: {
      id: true,
      title: true,
      desc: true,
      view: true,
      created_at: true,

      //_count 쓰는 이유 => 릴레이션을 맺은 데이터의 개수를 세기 위해 사용한다.
      // https://www.prisma.io/docs/orm/prisma-client/queries/aggregation-grouping-summarizing#filter-the-relation-coun
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
    },
  });
  return posts;
}

export const metadata = {
  title: "동네생활",
};

export default async function Life() {
  const posts = await getPosts();
  return (
    <div className="p-5 flex flex-col">
      {posts.map((post) => (
        <Link key={post.id} href={`/posts/${post.id}`} className="pb-5 mb-5 border-b border-neutral-500 text-neutral-400 flex  flex-col gap-2 last:pb-0 last:border-b-0">
          <h2 className="text-white text-lg font-semibold">{post.title}</h2>
          <p>{post.desc}</p>
          <div className="flex items-center justify-between text-sm">
            <div className="flex gap-4 items-center">
              <span>{formatToTimeAgo(post.created_at.toString())}</span>
              <span>·</span>
              <span>조회 {post.view}</span>
            </div>
            <div className="flex gap-4 items-center *:flex *:gap-1 *:items-center">
              <span>
                <HandThumbUpIcon className="size-4" />
                {post._count.likes}
              </span>
              <span>
                <ChatBubbleBottomCenterIcon className="size-4" />
                {post._count.comments}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
