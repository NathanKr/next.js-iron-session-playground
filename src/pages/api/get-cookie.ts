import { getIronSessionDefault } from "@/logic/utils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getIronSessionDefault(req, res);
  const cookieValue = session.value1;

  if (!cookieValue) {
    res.status(200).json({
      message: "Property value1 is not set or cookie not created or expired",
    });
  } else {
    res.status(200).json({ message: "Cookie retrieved", value1: cookieValue });
  }
}
