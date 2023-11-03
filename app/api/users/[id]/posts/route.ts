import { Prompt } from "@models/prompt";
import { connectToDB } from "@utils/database";

export async function GET(
  res: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB();
    const prompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
