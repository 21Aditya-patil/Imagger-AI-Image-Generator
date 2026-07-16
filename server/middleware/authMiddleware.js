import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: "JWT_SECRET is not configured" });
  }

  let token = req.headers.authorization;

  if (token && token.startsWith("Bearer")) {
    token = token.split(" ")[1];

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode.id;
      next();
    } catch (error) {
      res.status(401).json({ message: "Unauthorized" });
    }
  }
  else{
    res.status(401).json({ message: "No Token" })
  }
};
