import React from "react";
import { PromptWithCreator } from "./Feed";
import PromptCard from "./PromptCard";

type ProfileProps = {
  name: string;
  desc: string;
  data: PromptWithCreator[];
  handleEdit?: (id: string) => void;
  handleDelete?: (id: string) => void;
};

const Profile = ({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
}: ProfileProps) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10">
        {data.map((prompt) => (
          <PromptCard
            key={prompt._id}
            prompt={prompt}
            handleTagClick={() => {}}
            handleEdit={() => handleEdit && handleEdit(prompt._id)}
            handleDelete={() => handleDelete && handleDelete(prompt._id)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
