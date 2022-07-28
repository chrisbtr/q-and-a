import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = express.Router();

router
  .get(
    "/:code",
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
  )
  .route("/")
  .get(
    /**
     * GET all `categories`
     *
     */
    async (req, res) => {
      try {
        const allCategories = await prisma.categories.findMany({
          include: {
            questions: {
              where: { isAnswered: { equals: true } },
              include: { answers: true },
            },
          },
        });
        res.json(allCategories);
      } catch (error) {
        console.error(error);
        res.status(422).json({ message: "Unprocessable Entity", details: {} });
      }
    }
  );

export default router;
