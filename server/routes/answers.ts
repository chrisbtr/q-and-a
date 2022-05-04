import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { PrismaClient } from "@prisma/client";

import checkAuth from "../middleware/check-auth";

const prisma = new PrismaClient();

const router = express.Router();

router
  .route("/")
  .post(
    checkAuth,
    body("userData").exists({ checkFalsy: true }),
    body("questionId").isNumeric(),
    body("content").isString(),
    async (req: Request, res: Response) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const { userData, questionId, content } = req.body;
        const date = new Date();

        const question = await prisma.questions.findUnique({
          where: { id: questionId },
        });
        if (!question || question.isAnswered) {
          console.error(`question is ${question}`);
          console.error(`isAnswered is ${question?.isAnswered}`);
          res
            .status(422)
            .json({ message: "Unprocessable Entity", details: {} });
          return;
        }

        const answer = await prisma.answers.create({
          data: { content, createdAt: date, questionId, userId: userData.userId },
        });

        // TODO: find a better way to change `isAnswered` to true since if this errors the question will have
        // an answer but `isAnswered` will still be false
        await prisma.questions.update({
          where: { id: questionId },
          data: { isAnswered: true },
        });

        res.json(answer);
      } catch (error) {
        console.error(error);
        res.status(422).json({ message: "Unprocessable Entity", details: {} });
      }
    }
  );

export default router;
