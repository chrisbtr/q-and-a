import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { PrismaClient } from "@prisma/client";

import checkAuth from "../middleware/check-auth";

const prisma = new PrismaClient();
const router = express.Router();

router.route("/").post(
  checkAuth,
  body("userData").exists({ checkFalsy: true }),
  body("categoryCode").isString(),
  body("title").isString(),
  body("subject").isString(),
  body("answerContent").isString(),
  body("questionContent").isString(),

  /**
   * POST a new question and an answer to the question
   *
   * @param req.body.title The post title
   * @param req.body.subject The post subject
   * @param req.body.categoryCode The code of the category associated with the post
   * @param req.body.questionContent the question to be answered
   * @param req.body.answerContent the answer to the question
   */
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
        title,
        subject,
        categoryCode,
        questionContent,
        answerContent,
        userData,
      } = req.body;
      const date = new Date();

      // Create the question
      const newQuestion = await prisma.questions.create({
        data: {
          title: title,
          subject: subject,
          categoryCode: categoryCode,
          content: questionContent,
          isAnswered: true,
          createdAt: date,
          userId: userData.userId,
        },
      });

      // Create the answer to the question
      const newAnswer = await prisma.answers.create({
        data: {
          content: answerContent,
          createdAt: date,
          questionId: newQuestion.id,
          userId: userData.userId,
        },
      });
      res.json({ question: newQuestion, answer: newAnswer });
    } catch (error) {
      console.error(error);
      res.status(422).json({ message: "Unprocessable Entity", details: {} });
    }
  }
);

export default router;
