import db from "@/lib/db";
import { notFound } from "next/navigation";
import { EyeIcon, HandThumbUpIcon } from "@heroicons/react/24/solid";
import { HandThumbUpIcon as OutlineHandThumbUpIcon } from "@heroicons/react/24/outline";
import { formatToTimeAgo } from "@/lib/util";
import Image from "next/image";
import getSession from "@/lib/session";
import { revalidatePath, unstable_cache as nextCache, revalidateTag } from "next/cache";
import LikeButton from "@/components/like-button";

async function getPost(id: number) {
  // id가 제대로 되지 않으면 에러 나옴 그래서 try - catch 함
  try {
    const post = db.post.update({
      where: { id },
      data: {
        view: {
          // 자동으로 1 해주는 용어
          increment: 1,
        },
      },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });
    return post;
  } catch (error) {
    return null;
  }
}

const getCachedPost = nextCache(getPost, ["post-detail"], {
  tags: ["post-detail"],
  revalidate: 60,
});

// async function getLikeStatus(postId: number) {
//   //getSession 과 nextCache 를 같이 쓰면 안된다고 함
//   // const session = await getSession();
//   const isLiked = await db.like.findUnique({
//     where: {
//       id: {
//         postId,
//         userId: userId,
//       },
//     },
//   });
//   const likeCount = await db.like.count({
//     where: {
//       postId,
//     },
//   });
//   return {
//     likeCount,
//     isLiked: Boolean(isLiked),
//   };
// }

async function getLikeStatus(postId: number, userId: number) {
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        postId,
        userId,
      },
    },
  });
  const likeCount = await db.like.count({
    where: {
      postId,
    },
  });
  return {
    likeCount,
    isLiked: Boolean(isLiked),
  };
}

// const getCachedLikeStatus = nextCache(getLikeStatus, ["product-like-status"]);

async function getCachedLikeStatus(postId: number, userId: number) {
  const cachedOperation = nextCache((postId) => getLikeStatus(postId, userId), ["product-like-status"], {
    tags: [`like-status-${postId}`],
  });
  return cachedOperation(postId);
}

export default async function PostDetail({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }

  const post = await getCachedPost(id);
  if (!post) {
    return notFound();
  }

  // console.log("post >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", post);

  const session = await getSession();

  // const { likeCount, isliked } = await getCachedLikeStatus(id);
  const { likeCount, isLiked } = await getCachedLikeStatus(id, session.id!);

  return (
    <div className="p-5 text-white">
      <div className="flex items-center gap-2 mb-2">
        <Image width={28} height={28} className="size-7 rounded-full" src={post.user.avatar! ?? ""} alt={post.user.username} />
        <div>
          <span className="text-sm font-semibold">{post.user.username}</span>
          <div className="text-xs">
            <span>{formatToTimeAgo(post.created_at.toString())}</span>
          </div>
        </div>
      </div>
      <h2 className="text-lg font-semibold">{post.title}</h2>
      <p className="mb-5">{post.desc}</p>
      <div className="flex flex-col gap-5 items-start">
        <div className="flex items-center gap-2 text-neutral-400 text-sm">
          <EyeIcon className="size-5" />
          <span>조회 {post.view}</span>
        </div>
        <LikeButton isLiked={isLiked} likeCount={likeCount} postId={id} />
        {/* <form action={isLiked ? dislikePost : likePost}>
        </form> */}
      </div>
    </div>
  );
}

// https://react.dev/reference/react/useOptimistic

// Optimistic Update: 낙관적 업데이트.
// 서버호출함수가 성공했을경우에 업데이트될 화면의 모습을
// 현재 가지고있는 정보로 바로 업데이트해서 보여주는것

// 원래는 좋아요등을 눌러서 mutation이 발생하면, 서버의 데이터가 업데이트되고, 그 업데이트 결과를 다시 받아서 화면에 표시해주곤 하지만,

// optimistic update를 활용하면, 서버의 응답을 기다리지 않고
// 클라이언트에서 그냥 화면을 업데이트해버림

// 예를들면, 좋아요를 누르면 좋아요 숫자가 바로 증가하고, 버튼도 좋아요 취소 버튼으로 바뀜
// 서버의 data에 좋아요 클릭이 반영된거랑 상관없이 그냥 먼저 그렇게 해버림
// 웹 프로그램이 엄청 빠르다는 쾌적한 착각을 줄 수있음

// useOptimistic 훅을 사용하면 위에 설명한 optimistic Update를 손쉽게 구현할 수있음.
// 즉, 실제 서버 작업이 완료되기 전에 사용자가 보고있는 화면의 UI를 미리 업데이트할 수있음
