import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";

const ArticleContext = createContext();

export const ArticleContextProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem("articles"));
    if (storage && storage.length > 0) setArticles(storage);
  }, []);

  useEffect(() => {
    localStorage.setItem("articles", JSON.stringify(articles));
  }, [articles]);

  const getArticle = (id) => {
    return articles.find((article) => article.id === id);
  };

  const addArticle = (article) => {
    setArticles((prevArticles) => [article, ...prevArticles]);
  };

  const updateArticle = (article) => {
    setArticles((prevArticles) =>
      prevArticles.map((item) => (item.id === article.id ? article : item))
    );
  };
  const deleteArticle = (id) => {
    setArticles((prevArticles) =>
      prevArticles.filter((item) => item.id !== id)
    );
  };

  const payload = useMemo(
    () => ({ articles, addArticle, getArticle, updateArticle, deleteArticle }),
    [articles]
  );
  return (
    <ArticleContext.Provider value={payload}>
      {children}
    </ArticleContext.Provider>
  );
};

export const useArticleContext = () => useContext(ArticleContext);
