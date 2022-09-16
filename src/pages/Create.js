import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useArticleContext } from "../context/ArticleContext";

function Create() {
  const navigate = useNavigate();
  const { addArticle } = useArticleContext();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addArticle({
      id: new Date().toISOString(),
      title,
      content,
      created: new Date(),
    });
    setTitle("");
    setContent("");
    navigate("/");
  };

  return (
    <div className="max-w-screen-md mx-auto">
      <h1 className="text-bold text-2xl text-center mt-5">
        Create New Article
      </h1>

      <form onSubmit={handleSubmit} action="" className="flex flex-col gap-2">
        <label htmlFor="">Title</label>
        <input
          type="text"
          className="border border-gray-200 p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="">Content</label>
        <textarea
          className="border border-gray-200 p-2"
          name=""
          id=""
          cols="30"
          rows="20"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded-sm"
        >
          Proceed
        </button>
      </form>
    </div>
  );
}

export default Create;
