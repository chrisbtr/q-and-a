import express, { Express, Request, Response } from "express";
import { body, query, validationResult } from "express-validator";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import { config } from "dotenv";

import checkAuth from "./middleware/check-auth";
import users from "./routes/users";
import questions from "./routes/questions";
import answers from "./routes/answers";
import post from "./routes/post";

interface TypedRequestBody<T> extends Express.Request {
  body: T;
}

type PostQuestionRequestBody = {
  title: string;
  subject?: string;
  categoryCode: string;
  content: string;
};

type GetQuestionsRequestBody = {
  categoryCode?: string;
};

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

  app.get(
    "/categories",
    /**
     * GET all `categories`
     *
     */
    async (req, res) => {
      try {
        const allCategories = await prisma.categories.findMany({
          include: { questions: { include: { answers: true } } },
        });
        res.json(allCategories);
      } catch (error) {
        console.error(error);
        res.status(422).json({ message: "Unprocessable Entity", details: {} });
      }
    }
  );
}

app.get(
  "/categories/:code",
  /**
   * GET a single `category`
   *
   * @param req.params.code The code of the category being requested
   */
  async (req, res) => {
    try {
      const { code } = req.params;
      const category = await prisma.categories.findUnique({
        where: { code: code },
      });
      category
        ? res.json(category)
        : res.status(400).json({
            message: "400 Bad Request",
            details: { id: "This category does not exist" },
          });
    } catch (error) {
      console.error(error);
      res.status(422).json({ message: "Unprocessable Entity", details: {} });
    }
  }
);

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
