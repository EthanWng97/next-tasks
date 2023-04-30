import DailyQuestion from "../../public/1point3acres/daily-question.json";
import constants from "@/constants";
import envs from "@/envs";
import axios from "axios";

class OnePointThreeAcresError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OnePointThreeAcresError";
  }
}

export const checkin = async (todaysay: string, emoji: string) => {
  try {
    const response = await axios.post(
      constants.value["1point3acres"].api_host + "/api/users/checkin",
      {
        todaysay,
        qdxq: emoji,
      },
      {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          authorization: envs.value["1point3acres"].authorization,
        },
      }
    );
    return response;
  } catch (err) {
    throw new OnePointThreeAcresError(`Failed to checkin: ${err}`);
  }
};

export const getDailyQuestion = async () => {
  try {
    const response = await axios.get(
      constants.value["1point3acres"].api_host + "/api/daily_questions",
      {
        headers: {
          authorization: envs.value["1point3acres"].authorization,
        },
      }
    );
    return response;
  } catch (err) {
    throw new OnePointThreeAcresError(`Failed to checkin: ${err}`);
  }
};

export const getAnswerForDailyQuestion = async (
  questionId: number,
  questionText: string
) => {};
