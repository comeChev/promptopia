import User from "@models/user";
import { connectToDB } from "@utils/database";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB();
    const response = await User.findById(params.id);

    if (response.ok) {
      return new Response(JSON.stringify(response), { status: 200 });
    }
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
