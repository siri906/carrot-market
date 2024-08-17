//추후 연구하기

import db from "@/lib/db";

import { faker } from "@faker-js/faker";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

(async () => {
  for (let i = 0; i < 20; i++) {
    await db.product.create({
      data: {
        price: +faker.commerce.price({ min: 10000, max: 1000000 }),
        desc: `keyboard${i}`,
        title: `키보드${i}`,
        photo: `/keyboard.png`,
        created_at: new Date(),
        user: {
          connect: {
            id: 1,
          },
        },
      },
    });
  }
})();

// (async () => {
//   for (let i = 0; i < 10; i++) {
//     await prisma.product.create({
//       data: {
//         price: Number(faker.number.price({ min: 10000, max: 1000000 })),
//         price: Number(faker.commerce.price({ min: 10000, max: 1000000 })),
//         desc: faker.commerce.productDescription(),
//         title: faker.commerce.productName(),
//         photo: faker.image.urlPicsumPhotos(),
//         created_at: new Date(),
//         user: {
//           connect: {
//             id: 1,
//           },
//         },
//       },
//     });
//   }
// })();

// {
//   /*
// faker 사용법
// 1. npm install --save-dev @faker-js/faker
// 2. npm install tsx -D
// 3. package.json 에
//  "prisma": {
//     "seed": "tsx prisma/seed.ts"
//   }
//     추가

//   4. npx prisma db seed

//  주의!!! nextjs 를 재시작해야 type같은게 변경됐을 경우에 알수 있음
//   */
// }
