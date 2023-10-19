// App.tsx
import React, { useState, useEffect } from "react";
import "./App.css";
import ArticleList from "./components/ArticleList";
import ArticleForm, { ArticleProps } from "./components/ArticleForm";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import ArticlePage from "./components/ArticlePage";
// import { error } from "console";

const App: React.FC = () => {
    // const [articles, setArticles] = useState<ArticleProps[]>([]);
    const [publishStatement, setPublishStatement] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = (article: ArticleProps) => {
        console.log("article is:", article);
        setPublishStatement(false);
        fetch("https://bettertelegraph.onrender.com/api/records", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(article),
        })
            .then((response: any) => {
                console.log("response1 is:", response);
                if (response.status == 200) {
                    return response.json();
                }
            })
            .then((response: any) => {
                console.log("success redirect");
                navigate(`/record/${response._id}`);
                setPublishStatement(true);
            })
            .catch((err) => console.log(err));
    };

    return (
        // <BrowserRouter>
        <Routes>
            <Route path="/record/:uniqueAddress" element={<ArticlePage />} />
            <Route
                path="/"
                element={
                    <div className="max-w-screen-md mx-auto p-4 ">
                        {publishStatement ? (
                            <ArticleForm onSubmit={handleSubmit} />
                        ) : (
                            <p>Publishing...</p>
                        )}
                    </div>
                }
            />
        </Routes>
    );
};

export default App;

