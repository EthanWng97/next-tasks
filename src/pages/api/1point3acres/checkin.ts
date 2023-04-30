import type { NextApiRequest, NextApiResponse } from "next";
import { checkin } from "@/lib/1point3acres";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await checkin("测试中", "kx");

    res.status(200).json(response.data);
  } catch (err) {
    return res.status(500).json({
      message: `Error: ${err}`,
    });
  }
}
