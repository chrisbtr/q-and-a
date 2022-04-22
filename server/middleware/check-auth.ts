import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Auth failed" });
    }

    verify(token, "private");
    next();
  } catch (error) {
    return res.status(401).json({ message: "Auth failed" });
  }
};

export default checkAuth;
