// ArticleList.tsx
import React, { useEffect } from "react";
import Article from "./Article";

interface ArticleListProps {
    articles: ArticleProps[];
}

interface ArticleProps {
    title: string;
    content: string;
    date: string;
    _id?: string;
}

const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
    useEffect(() => {
        console.log("articles:", articles);
    });
    return (
        <div className="grid grid-cols-1 gap-4">
            {articles.map((article, index) => (
                <Article key={index} id={article._id ? article._id : "0"} title={article.title} content={article.content} date={article.date} />
            ))}
        </div>
    );
};

export default ArticleList;
