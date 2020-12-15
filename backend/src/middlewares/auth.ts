import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";


const auth = async (request: Request, response: Response, next: NextFunction) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).send({ error: "No token provided" });
  }
  const [scheme, token] = authHeader.split(" ");

  try {
    jwt.verify(token, "secret");
    
    return next();
  } catch (err) {
    return response.status(401).send({ error: "Token invalid" });
  }
}

export default auth;