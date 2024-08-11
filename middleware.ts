import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

// 함수명은 꼭 middleware여야함
// export async function middleware(request: NextRequest) {
//   console.log(request.nextUrl);
//   const session = await getSession();
//   const pathname = request.nextUrl.pathname;
//   if (pathname === "/") {
//     const response = NextResponse.next();
//     response.cookies.set("midd", "hello");
//     return response;
//   }
//   if (pathname === "/profile") {
//     // return Response.json({
//     //   error: "넌 허용 안되어있어 ",
//     // });
//     return Response.redirect(new URL("/", request.url));
//   }
// }

interface Routes {
  [key: string]: Boolean;
}

const publicOnlyUrl: Routes = {
  "/": true,
  "/login": true,
  "/sms": true,
  "/create-account": true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const exists = publicOnlyUrl[request.nextUrl.pathname];
  if (!session.id) {
    if (!exists) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (exists) {
      return NextResponse.redirect(new URL("/products", request.url));
    }
  }
}

// 웹사이트 모든 request에 반응한다

//config 라고 해야됨
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
