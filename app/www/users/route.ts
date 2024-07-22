// www 이란 폴더 명은 임의로 정한 폴더명이다.
//route 는 ui 를 랜더링 하지 않는다
//파일명 route는 중요하다

import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  console.log(request, "request");
  return Response.json({
    ok: true,
  });
}

export async function POST(request: NextRequest) {
  // request.cookies.get("")  쿠키 가져올 경우
  const data = await request.json();
  console.log("log user in");
  return Response.json(data);
}
