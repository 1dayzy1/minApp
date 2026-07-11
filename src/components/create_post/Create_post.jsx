import React, { useState } from 'react'
import axios, { create } from 'axios';
import "./create.css"

function Create_post({created, create}) {

    const[clsCreate, setClsCreate] = useState("create_modal");
    const[title, setTitle] = useState("");
    const[description, setDescription] = useState("");

     const[file, setFile] = useState(null);
     const[message, setMessage] = useState("")


    const pulicateForm = async() =>{
        console.log(title, description, file)


        const user = JSON.parse(localStorage.getItem("user"));
        console.log(user)

        if(!user){
            setMessage("Войдите в аккаунт");
            return;
        }


        if(!title && !description  && !file){
            setMessage("Введите данные");
            return;
        }



       
        

        const formDate = new FormData();
        formDate.append("file", file);

        const res_file = await axios.post("https://194e4aa72d1c5629.mokky.dev/uploads", formDate);

        console.log(res_file.data.url)
        const res_user = await axios.post("https://194e4aa72d1c5629.mokky.dev/posts",{
            title:title,
            count_likes:0,
            description:description,
            post_url:res_file.data.url,
            creator:user.login,
            creator_url:user.url,
            likers:[]
        })

        setClsCreate("create_modal");
        setDescription("");
        setFile(null);
        setTitle("")
        created(!create)
    }


    return (
        <div className="create-post">
            <button className="create-post__button" onClick={() => setClsCreate("create_modal active")}>
                + Создать пост
            </button>

            <div className={clsCreate}>


            <div className="shadow" onClick={() => setClsCreate("create_modal")}></div>

            <div className="create-post__form">
                <h2 className="create-post__title">Создание поста</h2>

                <input
                    className="create-post__input"
                    type="text"
                    placeholder="Название"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />

                <textarea
                    className="create-post__textarea"
                    placeholder="Описание"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                />

                <input
                    className="create-post__input"
                    type="file"
                    onChange={(e) => {

                        const MAX_SIZE = 3 * 1024 * 1024
                        if(e.target.files[0].size > MAX_SIZE){
                            setMessage("Файл слишком большой(до 3мб)")
                        }
                        setFile(e.target.files[0])
                    
                    
                    }}
                    value={''}
                />

                {message ? <p className="message">{message}</p> : ''}

                <button className="create-post__submit" onClick={pulicateForm}>
                    Опубликовать
                </button>
            </div>

            </div>

            
        </div>
    )
}

export default Create_post
