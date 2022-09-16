import React from "react";
import { useNavigate } from "react-router-dom";
import { useArticleContext } from "../context/ArticleContext";
import moment from "moment";

function Articles() {
  const navigate = useNavigate();
  const { articles } = useArticleContext();
  return (
    <div className="max-w-screen-md mx-auto">
      <button
        onClick={() => navigate("/create")}
        className="bg-blue-500 w-full text-white rounded-sm py-2 my-2"
      >
        Add article
      </button>
      <div className="flex flex-col gap-2">
        {articles.map(({ id, title, content, created }) => (
          <div
            key={id}
            className="border border-green-400 p-2 rounded-md bg-gray-200 cursor-pointer"
            onClick={() => navigate(`/view/${id}`)}
          >
            <p className="text-xs italic">
              {moment(new Date(created)).format("MMMM Do YYYY")}
            </p>
            <h1 className="font-bold">{title}</h1>
            <p>{content.slice(0, 500)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Articles;
