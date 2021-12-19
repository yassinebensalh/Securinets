import axios from 'axios';
import { useState, useEffect } from 'react';
import Blog from '../../components/sections/Blog'
import React from 'react';
import SearchBar from './SearchBar';


const Blogs = () => {
    // store movies in state
    const [blogs, setBlogs] = useState([]);

    // fetch movies
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/AllBlogs`)
            .then(res => setBlogs(res.data))
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

export default Blogs;