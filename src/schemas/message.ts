import { z } from "zod";
import { CONFIG } from "../config";

export const messageSchema = z.object({
  text: z
    .string()
    .min(1, "Message cannot be empty")
    .max(
      CONFIG.MAX_MESSAGE_LENGTH,
      `Message cannot be longer than ${CONFIG.MAX_MESSAGE_LENGTH} characters`
    )
});
