import { PrismaClient } from "@prisma/client";
import { contains } from "validator";

const db = new PrismaClient();

// async function test() {
//   const user = await db.user.findMany({
//     where: {
//       username: {
//         contains: "est",
//       },
//     },
//   });

//   console.log(user);
// }

// async function test() {
//   const smsToken = await db.sMSToken.create({
//     data: {
//       token: "12341234",
//       user: {
//         connect: {
//           id: 1,
//         },
//       },
//     },
//   });
//   console.log(smsToken);
// }

// test();

export default db;
