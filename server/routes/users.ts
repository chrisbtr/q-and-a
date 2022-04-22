import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { PrismaClient } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

const router = express.Router();

router
  .route("/")
  .post(
    body("firstName").isString(),
    body("lastName").isString(),
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 8 }),
    async (req: Request, res: Response) => {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const { firstName, lastName, email, password } = req.body;
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email },
          });
          if (existingUser) {
            return res.status(422).json({ message: "email is already in use" });
          }
          const encryptedPassword = await bcrypt.hash(password, 10);
          await prisma.user.create({
            data: { firstName, lastName, email, password: encryptedPassword },
          });
          res.status(201).json({ message: "successfully created account" });
        } catch (error) {
          res.status(500).json({ error });
        }
      } catch (error) {
        res.status(422).json({ message: "Unprocessable Entity", details: {} });
      }
    }
  );
router.post(
  "/login",
  body("email").isEmail().normalizeEmail(),
  body("password").isString(),
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const user = await prisma.user.findUnique({ where: { email } });
      console.log(user);
      if (!user) {
        return res.status(401).json({ message: "Auth failed" });
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      return isValidPassword
        ? res.json({
            message: "Auth successful",
            token: jwt.sign({ userId: user.id, email: user.email }, "private", {
              expiresIn: "1h",
            }),
          })
        : res.status(401).json({ message: "Auth failed" });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);

export default router;
