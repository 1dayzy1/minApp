import React, { useState } from 'react'
import Post from '../posts/Post'
import Create_post from '../create_post/Create_post'

function Lenta() {

  const [createdPost, setCreatedPost] = useState(false);


  return (
    <div>


        <div>

            <Create_post created={setCreatedPost} create={createdPost}/>

        </div>

        <div>

                <Post created={createdPost}/>

        </div>
    </div>
  )
}

export default Lenta
