"use client";
import { FormEvent, useState } from "react";

import { useRouter } from "next/navigation";
import Form from "@components/Form";
import { useSession } from "next-auth/react";
import { revalidatePath } from "next/cache";

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });
  const { data: session } = useSession();
  const router = useRouter();

  async function createPrompt(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    if (!session) {
      alert("You must be logged in to create a prompt.");
      return;
    }
    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.prefetch("/");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
