// Article.tsx
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

interface ArticleProps {
    title: string;
    content: string;
    date: string;
    id: string;
}

const Article: React.FC<ArticleProps> = ({ title, content, date, id }) => {
    return (
        <div className="p-4 bg-white">
            <Link to={`/record/${id}`}>
                <h2 className="text-xl font-[roboto] text-[24px] break-words pb-2">{title}</h2>
                <div className="w-full">
                    <pre className="break-words font-[Montserrat] text-[14px] pb-2">{content}</pre>
                </div>
                <p className="text-sm text-gray-500">Дата публикации: {date}</p>
            </Link>
        </div>
    );
};

export default Article;
