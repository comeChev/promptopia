"use client";

import { FormEvent, useEffect, useState } from "react";
import PromptCard from "./PromptCard";

export type PromptWithCreator = {
  creator: { _id: string; email: string; username: string; image: string };
  _id: string;
  prompt: string;
  tag: string;
};

type PromptCardListProps = {
  posts: PromptWithCreator[];
  handleTagClick: (tag: string) => void;
};

const PromptCardList = ({ posts, handleTagClick }: PromptCardListProps) => {
  return (
    <div className="mt-16 prompt_layout">
      {posts.map((prompt) => (
        <PromptCard
          key={prompt._id}
          prompt={prompt}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [dataDB, setDataDB] = useState([]);
  function handleSearchChange(e: FormEvent<HTMLInputElement>) {
    setSearchText(e.currentTarget.value);
    const filteredData = dataDB.filter(
      (prompt: PromptWithCreator) =>
        prompt.tag.search(e.currentTarget.value) !== -1 ||
        prompt.creator.username.search(e.currentTarget.value) !== -1 ||
        prompt.prompt.search(e.currentTarget.value) !== -1
    );
    setPosts(filteredData);
    e.currentTarget.value === "" && setPosts(dataDB);
  }
  function handleClickTag(tag: string) {
    setSearchText(tag);
    const filteredData = dataDB.filter(
      (prompt: PromptWithCreator) => prompt.tag.search(tag) !== -1
    );
    setPosts(filteredData);
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
      setDataDB(data);
    };
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username or a prompt content"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList posts={posts} handleTagClick={handleClickTag} />
    </section>
  );
};

export default Feed;
