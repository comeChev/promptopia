import { Prompt } from "@models/prompt";
import { connectToDB } from "@utils/database";

export async function GET(req: Request, res: Response) {
  try {
    await connectToDB();
    const prompts = await Prompt.find({}).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
