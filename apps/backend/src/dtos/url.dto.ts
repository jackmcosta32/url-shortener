import { z } from "zod";

export const FindUrlByIdDto = z.object({
  id: z.string().nonempty(),
});

export const CreateUrlDto = z.object({
  uri: z.string().url(),
});

export const FindUrlByEncodedUriDto = z.object({
  encodedUri: z.string().nonempty(),
});
