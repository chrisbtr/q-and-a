// IMPORTANT: This is a sample file! 
// Please create a copy of this file in this directory, rename the copy to "seed.ts", and remove this comment 
import { PrismaClient, Categories } from "@prisma/client";

const prisma = new PrismaClient();

const CATAGORIES: Categories[] = [];

async function main() {
  for (const category of CATAGORIES) {
    const upsertedCategory = await prisma.categories.upsert({
      where: { code: category.code },
      update: {},
      create: { code: category.code, name: category.name, description: "" },
    });

    console.log("A category was 'upserted' into the db:");
    console.log(upsertedCategory);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
