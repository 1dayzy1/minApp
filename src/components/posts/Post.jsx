import React, { useEffect, useState } from 'react'
import "./post.css"
import axios from 'axios'

function Post({ created }) {


    const [posts, setPosts] = useState([]);


    useEffect(() => {

        const fetchPost = async () => {
            const res = await axios.get("https://194e4aa72d1c5629.mokky.dev/posts");
            const shuffledPosts = [...res.data].sort(() => Math.random() - 0.5);

            setPosts(shuffledPosts);


        }

        fetchPost()

    }, [created])


    const likePost = async (postId) => {
        const user = JSON.parse(localStorage.getItem("user"));

        if(!user){
            alert("you not auth!");
            return
        }

        const { data: post } = await axios.get(
            `https://194e4aa72d1c5629.mokky.dev/posts/${postId}`
        );

        let likers;

        if (post.likers.includes(user.login)) {
           
            likers = post.likers.filter(login => login !== user.login);
        } else {
            
            likers = [...post.likers, user.login];
        }

        await axios.patch(
            `https://194e4aa72d1c5629.mokky.dev/posts/${postId}`,
            {
                likers,
                count_likes: likers.length
            }
        );

        setPosts(prev =>
            prev.map(p =>
                p.id === postId
                    ? { ...p, likers, count_likes: likers.length }
                    : p
            )
        );
    }


    return (
        <div className="posts">

            {
                posts.map((el, index) => (
                    <div className="post" key={index}>
                        <div className="post__author">
                            <img
                                className="post__author-avatar"
                                src={el.creator_url}
                                alt={el.creator}
                            />

                            <span className="post__login">
                                {el.creator}
                            </span>
                        </div>

                        <img
                            className="post__image"
                            src={el.post_url}
                            alt={el.title}
                        />

                        <div className="post__content">
                            <h2 className="post__title">{el.title}</h2>

                            <p className="post__text">
                                {el.description}
                            </p>

                            <div className="post__footer">
                                <div className="post__likes" onClick={() => likePost(el.id)}>
                                    ❤️ <span>{el.count_likes}</span>
                                </div>

                                <button className="post__favorite">
                                    ⭐ В избранное
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            }



        </div>
    )
}

export default Post
