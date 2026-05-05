import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
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
