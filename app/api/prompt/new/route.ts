import { Prompt } from "@models/prompt";
import { connectToDB } from "@utils/database";

export async function POST(req: Request) {
  const { userId, prompt, tag } = await req.json();
  try {
    await connectToDB();
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error: any) {
    return (
      new Response(error.message),
      {
        status: 500,
      }
    );
  }
}
