
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { password, email } = req.body;

    if ( !password || !email) {
      return res.status(400).json({ error: "Бүх талбарыг бөглөнө үү." });
    }

    try {
      // Email давхцахгүй байх
      const existinguser = await prisma.user.findUnique({
        where: { email },
      });

      if (existinguser) {
        return res.status(400).json({ error: "Бүртгэлтэй email байна." });
      }

      // амжилттай
      const newUser = await prisma.user.create({
        data: {
          password,
          email,
        },
      });

      return res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}