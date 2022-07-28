import express, { Express } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import { config } from "dotenv";

import users from "./routes/users";
import questions from "./routes/questions";
import answers from "./routes/answers";
import post from "./routes/post";
import categories from "./routes/categories";

config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

const prisma = new PrismaClient();

async function main() {
  // User
  app.use("/users", users);

  // Answers
  app.use("/answers", answers);

  // Post question and answer
  app.use("/post", post);

  // Questions
  app.use("/questions", questions);

  // Categories
  app.use("/categories", categories);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server has started on port ${port}`);
});
