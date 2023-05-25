import Replicate from "replicate";

import dotenv from "dotenv";
dotenv.config();
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

// function that check if a dog is in image using replication API
export async function isDogInImage(imageUrl: string) {
  const output = await replicate.run(
    "andreasjansson/blip-2:4b32258c42e9efd4288bb9910bc532a69727f9acd26aa08e175713a0a857a608",
    {
      input: {
        image: imageUrl,
        question: "Does this image have a dog? false for no, true for yes",
      },
    }
  );
  return output;
}
