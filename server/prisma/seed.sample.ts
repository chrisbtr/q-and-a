// IMPORTANT: This is a sample file! 
// Please create a copy of this file in this directory, rename the copy to "seed.ts", and remove this comment 
import { PrismaClient, Categories } from "@prisma/client";
import faker from "faker";

const prisma = new PrismaClient();

const questionCount = 100;
const userId = 1;
const CATAGORIES: Categories[] = [
  {
    code: "test_code",
    name: "Test Cat",
    description: "This is a test category",
  },
  {
    code: "test_code_2",
    name: "Test Cat 2",
    description: "This is a second test category",
  },
];

async function main() {
  for (const category of CATAGORIES) {
    const upsertedCategory = await prisma.categories.upsert({
      where: { code: category.code },
      update: {},
      create: {
        code: category.code,
        name: category.name,
        description: category.description,
      },
    });

    console.log("A category was 'upserted' into the db:");
    console.log(upsertedCategory);
  }

  for (let i = 0; i < questionCount; i++) {
    const questionSubject = faker.random.words(5);

    const questionContent = faker.random.words(50);
    const answerContent = faker.random.words(100);

    const questionCreationDate = faker.date.between(
      "2020-01-01T00:00:00.000Z",
      "2030-01-01T00:00:00.000Z"
    );
    const answerCreationDate = faker.date.between(
      "2020-01-01T00:00:00.000Z",
      "2030-01-01T00:00:00.000Z"
    );
    const category = faker.random.arrayElement(CATAGORIES);
    const upsertedQuestion = await prisma.questions.upsert({
      where: { id: i },
      update: {
        userId,
        categoryCode: category.code,
        subject: questionSubject,
        content: questionContent,
        createdAt: questionCreationDate,
        isAnswered: true,
        title: `Question Number ${i}`,
      },
      create: {
        id: i,
        userId,
        categoryCode: category.code,
        content: questionContent,
        createdAt: questionCreationDate,
        isAnswered: true,
        title: `Question Number ${i}`,
      },
    });

    const upsertedAnswer = await prisma.answers.upsert({
      where: { id: i },
      update: {
        questionId: i,
        userId,
        content: answerContent,
        createdAt: answerCreationDate,
      },
      create: {
        id: i,
        questionId: i,
        userId,
        content: answerContent,
        createdAt: answerCreationDate,
      },
    });

    console.log("A question and answer was 'upserted' into the db:");
    console.log(upsertedQuestion);
    console.log(upsertedAnswer);
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
