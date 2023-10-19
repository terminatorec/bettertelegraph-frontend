// ArticleForm.tsx
// import { convertFromRaw, convertToRaw } from "draft-js";
import React, { useEffect, useRef, useState } from "react";
// import { Editor } from "react-draft-wysiwyg";
// import { Editor, EditorState } from "draft-js";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

interface ArticleFormProps {
    onSubmit: (article: ArticleProps) => void;
}

export interface ArticleProps {
    title: string;
    content: string;
    date: string;
    _id?: string;
}

const ArticleForm: React.FC<ArticleFormProps> = ({ onSubmit }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [notification, setNotification] = useState("");
    // const refTextArea = useRef(null);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    // const [editorContent, setEditorContent] = useState<any>();

    const handleSubmit = () => {
        if (title.trim() == "") {
            setNotification("Title is too small");
        } else {
            if (content.trim() == "") {
                setNotification("Empty content");
            } else {
                const article = {
                    title,
                    content,
                    date: new Date().toLocaleString(),
                };
                onSubmit(article);
                setTitle("");
                setContent("");
            }
        }
        setTimeout(() => setNotification(""), 3000);
    };

    // This function is triggered when textarea changes
    const textAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(event.target.value);
    };

    useEffect(() => {
        if (textareaRef && textareaRef.current) {
            textareaRef.current.style.height = "0px";
            const scrollHeight = textareaRef.current.scrollHeight;
            textareaRef.current.style.height = scrollHeight + "px";
        }
    }, [content]);

    return (
        <div className="bg-white p-1 w-full">
            {/* <h2 className="text-xl font-bold">Добавить статью</h2> */}
            <div className="md:flex md:justify-between">
                <div className="w-full">
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3  outline-none text-[32px] titleForm"
                    />
                    <textarea
                        ref={textareaRef}
                        onChange={textAreaChange}
                        placeholder="Your story..."
                        value={content}
                        // onChange={(e) => setContent(e.target.value)}
                        className="w-full  px-3 mt-2 resize-none text-[16px] outline-none h-fit contentForm"
                    />
                </div>
                <div className="w-[200px] text-left md:text-center ml-3">
                    <button
                        onClick={handleSubmit}
                        className="bg-white cursor-pointer h-fit text-black font-bold py-0 px-3 border-black border-[2px] rounded-full mx-auto mt-2 md:mt-0"
                    >
                        PUBLISH
                    </button>
                    <p className="text-red-500 w-fit  md:mx-auto mt-2">{notification}</p>
                </div>
            </div>
        </div>
    );
};

export default ArticleForm;
