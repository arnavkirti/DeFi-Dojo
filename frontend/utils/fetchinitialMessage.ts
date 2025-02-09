import axios from "axios";

export const fetchInitialMessage = async (message: string) => {
    try {
        const response = await axios.post(
          process.env.NEXT_PUBLIC_AI_AGENT_URL!,
          {
            message: `${message}`,
          },
          {
            auth: {
              username: process.env.NEXT_PUBLIC_AI_AGENT_USERNAME!,
              password: process.env.NEXT_PUBLIC_AI_AGENT_PASSWORD!,
            },
          }
        );

        return response.data.response[0];
      } catch (error) {
        console.error("Error fetching tutorial content:", error);
      }
}