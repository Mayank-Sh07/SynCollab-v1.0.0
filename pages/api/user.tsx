import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/supabase/index";
import { definitions } from "@/types/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const userId = req.body.userId;
  const data = await supabase
    .from<definitions["profiles"]>("profiles")
    .select("*")
    .eq("id", userId);

  if (data.error) {
    res.status(403).end("Unable to fetch user data");
  }

  res.status(200).json({ data: data?.body });
}
