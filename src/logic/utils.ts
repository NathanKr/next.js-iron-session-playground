import { IronSessionData } from "@/types/types";
import { getIronSession, IronSession } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";
import { COOKIE_NAME } from "./constants";

/**
 * Minimal setup
 * @param req 
 * @param res 
 * @returns 
 */
export function getIronSessionDefault(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<IronSession<IronSessionData>> {
  const sessionOptions = {
    password: process.env.IRON_SESSION_PASSWORD!,
    cookieName: COOKIE_NAME,
  };
  return getIronSession<IronSessionData>(req, res, sessionOptions);
}
