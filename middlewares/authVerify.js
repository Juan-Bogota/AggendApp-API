import jwt from "jsonwebtoken";
import environment from "../config/environment";

export const authVerify = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(token, environment.secret);
      req.user = decoded;
    } catch (error) {
      res.status(401).send("Unauthorizared");
    }
  } else {
    res.status(401).send("Token is mandatory");
  }
  next();
};
