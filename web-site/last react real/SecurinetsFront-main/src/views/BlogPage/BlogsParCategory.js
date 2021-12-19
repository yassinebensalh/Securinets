import axios from 'axios';
import { useState, useEffect } from 'react';
import Blog from '../../components/sections/Blog'
import React from 'react';
import { useParams } from "react-router-dom";



const BlogsParCategory = () => {
    // store movies in state
    const [blogs, setBlogs] = useState([]);
    const {category} = useParams();
 
    // fetch movies
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/SearchWithCategory/${category}`)
            .then(res =>setBlogs(res.data))
    }, [])

    // rendered movies
    const renderedblogs = blogs.map(m => <Blog {...m} />)

    return (
        <>

            <div className="container" style={{ marginTop: "15vh" }}>
                <div className="row">
                    {renderedblogs}
                </div>
            </div>
        </>

    )
}

export default BlogsParCategory