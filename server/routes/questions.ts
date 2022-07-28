import express, { Request, Response } from "express";
import { body, query, validationResult } from "express-validator";
import { PrismaClient } from "@prisma/client";

import checkAuth from "../middleware/check-auth";

const prisma = new PrismaClient();

const router = express.Router();

router.route("/").get(
  query("id").optional().isNumeric({ no_symbols: true }),
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
        id,
        categoryCode,
        take = 30,
        skip = 0,
        searchBy,
      } = req.query as any;

      const allQuestions = await prisma.questions.findMany({
        where: {
          id: { equals: Number(id) || undefined },
          AND: {
            categoryCode: categoryCode,
            AND: {
              isAnswered: { equals: true },
              OR: [
                { title: { contains: searchBy, mode: "insensitive" } },
                { content: { contains: searchBy, mode: "insensitive" } },
              ],
            },
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

// TODO: Uncomment this out and fix if posting questions without answers is ever needed. 
// app.post(
//   "/questions",
//   checkAuth,
//   body("userData").exists({ checkFalsy: true }),
//   body("title").isString(),
//   body("subject").isString(),
//   body("categoryCode").isString(),
//   body("content").isString(),
//   /**
//    * POST a new `question`
//    *
//    * @param req.params.title question title
//    * @param req.params.subject question subject
//    * @param req.params.categoryCode The code of the category associated with the question
//    * @param req.content the question to be answered
//    * @param req.isAnswered `true` only if the the question has been answered
//    */
//   async (req: Request, res: Response) => {
//     try {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }

//       const { title, subject, categoryCode, content, userData } = req.body;
//       const date = new Date();
//       const newQuestion = await prisma.questions.create({
//         data: {
//           title: title,
//           subject: subject,
//           categoryCode: categoryCode,
//           content: content,
//           isAnswered: false,
//           createdAt: date,
//           userId: userData.userId,
//         },
//       });

//       res.json(newQuestion);
//     } catch (error) {
//       console.error(error);
//       res.status(422).json({ message: "Unprocessable Entity", details: {} });
//     }
//   }
// );

export default router;
