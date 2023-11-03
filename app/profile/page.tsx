"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import Profile from "@components/Profile";
import { PromptWithCreator } from "@components/Feed";

const ProfilePage = () => {
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();

  function handleEdit(id: string) {
    router.push(`/update-prompt?id=${id}`);
  }
  async function handleDelete(id: string) {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );
    if (!hasConfirmed) return;
    const response = await fetch(`/api/prompt/${id}`, { method: "DELETE" });
    if (response.ok) {
      const filteredPosts = posts.filter(
        (post: PromptWithCreator) => post._id !== id
      );
      setPosts(filteredPosts);
    }
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user?.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };

    if (session?.user?.id) fetchPosts();
  }, []);

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page."
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
