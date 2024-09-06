import { COOKIE_VALUE1 } from "@/logic/constants";
import { getIronSessionDefaultMaxAge } from "@/logic/utils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getIronSessionDefaultMaxAge(req, res);
    session.value1 = COOKIE_VALUE1;
    await session.save(); // --- encrypt the session data and set cookie

    res.status(200).json({ message: "Cookie set" });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
