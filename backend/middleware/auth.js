import jwt from "jsonwebtoken";

export async function auth(req, res, next) {

  try {

    console.log(req.cookies);

    const token = req.cookies.token;

    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized"
      });
    }

    const decode = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decode;

    next();

  } catch (err) {

    console.log(err);

    return res.status(401).send({
      success: false,
      message: "Invalid Token"
    });

  }

}