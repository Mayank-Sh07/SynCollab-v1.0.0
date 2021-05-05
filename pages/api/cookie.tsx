import { supabase } from "@/supabase/index";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("here");
  supabase.auth.api.setAuthCookie(req, res);
  return;
}
