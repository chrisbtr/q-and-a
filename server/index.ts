import express, { Express, Request, Response } from "express";
import { body, query, validationResult } from "express-validator";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import { config } from "dotenv";

import checkAuth from "./middleware/check-auth";
import users from "./routes/users";
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

  app.get(
    "/questions",
    query("take").optional().isNumeric({ no_symbols: true }),
    query("skip").optional().isNumeric({ no_symbols: true }),
    query("categoryCode").optional().isString(),
    query("searchBy").optional().isString(),
    /**
     * GET all `questions` that have been answered
     *
     * @param req.query.categoryCode `categoryCode` can be pass into the the request body to only
     *    get the `questions` for that category
     * @param req.query.take The max amount of questions send back
     * @param req.query.skip The amount of questions to skip
     * @param req.query.searchBy The text to filter the title of the found questions by
     */
    async (req, res) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        // TODO: This throws a typescript error because of the express-validator 'query' hook
        // temp fix is to cast req.query to an any type. Find a better fix.
        const {
          categoryCode,
          take = 30,
          skip = 0,
          searchBy,
        } = req.query as any;

        const allQuestions = await prisma.questions.findMany({
          where: {
            categoryCode: categoryCode,
            AND: {
              isAnswered: { equals: true },
              OR: [
                { title: { contains: searchBy, mode: "insensitive" } },
                { content: { contains: searchBy, mode: "insensitive" } },
              ],
            },
          },
          take: Number(take),
          skip: Number(skip),
          include: { answers: true },
        });

        res.json(allQuestions);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", details: {} });
      }
    }
  );

  app.get(
    "/questions/:id",
    /**
     * GET a `question` with `id`
     *
     * @param req.params.id The id of the question being requested
     */
    async (req, res) => {
      try {
        const { id: stringId } = req.params;
        const id = Number(stringId);

        const question = await prisma.questions.findUnique({
          where: { id },
        });

        question
          ? res.json(question)
          : res.status(400).json({
              message: "400 Bad Request",
              details: { id: "This question does not exist" },
            });
      } catch (error) {
        res.status(500).json({
          message: "Internal Server Error",
          details: {},
        });
      }
    }
  );

  app.post(
    "/questions",
    checkAuth,
    body("userData").exists({ checkFalsy: true }),
    body("title").isString(),
    body("subject").isString(),
    body("categoryCode").isString(),
    body("content").isString(),
    /**
     * POST a new `question`
     *
     * @param req.params.title question title
     * @param req.params.subject question subject
     * @param req.params.categoryCode The code of the category associated with the question
     * @param req.content the question to be answered
     * @param req.isAnswered `true` only if the the question has been answered
     */
    async (req: Request, res: Response) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const { title, subject, categoryCode, content, userData } = req.body;
        const date = new Date();
        const newQuestion = await prisma.questions.create({
          data: {
            title: title,
            subject: subject,
            categoryCode: categoryCode,
            content: content,
            isAnswered: false,
            createdAt: date,
            userId: userData.userId,
          },
        });

        res.json(newQuestion);
      } catch (error) {
        console.error(error);
        res.status(422).json({ message: "Unprocessable Entity", details: {} });
      }
    }
  );

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
