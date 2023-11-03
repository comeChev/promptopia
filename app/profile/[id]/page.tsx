"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Profile from "@components/Profile";
import { PromptWithCreator } from "@components/Feed";

const ProfilePage = () => {
  const params = useParams();
  const [posts, setPosts] = useState([] as PromptWithCreator[]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`);
      const data = await response.json();
      setPosts(data as PromptWithCreator[]);
    };

    if (params.id) fetchPosts();
  }, []);

  return (
    <Profile
      name={posts[0]?.creator.username}
      desc={`Welcome to ${posts[0]?.creator.username}'s personalized profile page.`}
      data={posts}
    />
  );
};

export default ProfilePage;
