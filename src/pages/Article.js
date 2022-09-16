import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useArticleContext } from "../context/ArticleContext";
import moment from "moment";

function Article() {
  const navigate = useNavigate();
  const params = useParams();
  const { getArticle, updateArticle, deleteArticle } = useArticleContext();

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [article, setArticle] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (params) {
      const data = getArticle(params.id);
      console.log("data is: ", data);
      setArticle(data);
      setTitle(data.title);
      setContent(data.content);
      setLoading(false);
    }
  }, [params.id]);

  const handleUpdate = () => {
    updateArticle({
      id: article.id,
      title,
      content,
    });
    setTitle("");
    setContent("");
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) handleUpdate();
    setIsEditing(true);
  };

  const handleCancel = () => {
    setTitle(article.title);
    setContent(article.content);
    setIsEditing(false);
  };

  const handleDeleteArticle = () => {
    deleteArticle(article.id);
    navigate("/");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-screen-md mx-auto">
      <h1 className="text-bold text-2xl text-center mt-5">Edit Article</h1>
      <p className="text-sm italic mt-5 mb-2">
        Date created: {moment(new Date(article.created)).format("MMMM Do YYYY")}
      </p>
      <form onSubmit={handleSubmit} action="" className="flex flex-col gap-2">
        <label htmlFor="">Title</label>
        <input
          disabled={!isEditing}
          type="text"
          className="border border-gray-200 p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="">Content</label>
        <textarea
          disabled={!isEditing}
          className="border border-gray-200 p-2"
          name=""
          id=""
          cols="30"
          rows="20"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        {isEditing ? (
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded-sm"
          >
            Proceed
          </button>
        ) : (
          <button className="bg-green-500 text-white py-2 rounded-sm">
            Edit
          </button>
        )}
      </form>
      <div className="mt-2">
        {isEditing ? (
          <button
            className="w-full bg-gray-500 text-white py-2 rounded-sm"
            onClick={handleCancel}
          >
            Cancel
          </button>
        ) : (
          <button
            className="w-full bg-red-500 text-white py-2 rounded-sm"
            onClick={handleDeleteArticle}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default Article;
