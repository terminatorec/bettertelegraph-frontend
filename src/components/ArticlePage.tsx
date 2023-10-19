import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import axios from 'axios';

const ArticlePage = () => {
    const { uniqueAddress } = useParams();
    const [record, setRecord] = useState<any>(null);

    useEffect(() => {
        // Здесь мы отправляем запрос на сервер, чтобы получить запись по уникальному адресу
        fetch(`https://bettertelegraph.onrender.com/api/records/${uniqueAddress}`)
            .then((response) => {
                console.log("result response is:", response);
                setRecord(response);
                return response;
            })
            .then((response) => {
                return response.json();
            })
            .then((response) => {
                console.log("result response is:", response);
                setRecord(response);
            })
            .catch((error) => {
                console.error("Ошибка при получении записи:", error);
            });
    }, [uniqueAddress]);

    return (
        <div className="max-w-screen-md mx-auto p-4">
            {record ? (
                <div>
                    <h2 className="font-[roboto] text-[32px] mb-4 break-words">{record.title}</h2>
                    <pre className="leading-6 font-[Montserrat] text-[16px]">{record.content}</pre>
                    <p className="mt-4 italic font-[Montserrat] text-[14px]">
                        Publication date: {record.date}
                    </p>
                </div>
            ) : (
                <p>Load...</p>
            )}
        </div>
    );
};

export default ArticlePage;
