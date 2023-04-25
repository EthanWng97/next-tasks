import type { NextApiRequest, NextApiResponse } from "next";
import { getDailyQuestion } from "@/lib/1point3acres";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await getDailyQuestion();
    console.log(response.data);

    res.status(200).json(response.data);
  } catch (err) {
    return res.status(500).json({
      message: `Error: ${err}`,
    });
  }
}
