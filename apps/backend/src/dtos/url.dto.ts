import { z } from "zod";

export const FindUrlByIdDto = z.object({
  id: z.string().nonempty(),
});

export const CreateUrlDto = z.object({
  uri: z.string().url(),
});
