import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom'


export const BlogPage = () => {

    // extract id 
    const { id } = useParams();


    let isOwner;
    // store movies in state
    const [BlogContent, setBlogContent] = useState([]);

    const username = localStorage.getItem('username');






    // fetch movies
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/oneBlog/${id}`)
            .then(res => setBlogContent(res.data[0]))
    }, [])
    BlogContent.owner === username ? isOwner = true : isOwner = false;


    return (
        <div className="container" style={{ marginTop: "25vh", backgroundColor: "#1b1f26", borderRadius: "10px 20px 10px 20px",  padding: "20px 40px 41px 40px", border: "2px solid #9FEF00" }}>
            {isOwner && <Link to={`/Blogs/Edit/${id}`} >Edit </Link>}

            <div dangerouslySetInnerHTML={{ __html: BlogContent.blogContent }} />
        </div>
    )
}
export default BlogPage
