import React from 'react'
import { Link } from "react-router-dom";


const Blog = ({ owner, description, title, Category ,id}) => {
id = btoa(id);
    return (


        /*   <div className="tiles-item reveal-from-middle" data-reveal-delay="200" > */
        <div className="tiles-item " data-reveal-delay="200">
            <div className="tiles-item-inner" >{owner}
                <div className="testimonial-item-content" >
                    <p style={{ width: "200px", color: "red", wordWrap: "break-word" }}>
                        {description}
                    </p>

                </div>
                <div className="testimonial-item-footer text-xs mt-32 mb-0 has-top-divider">
                    <span className="testimonial-item-name text-color-high">{title}</span>
                    <span className="testimonial-item-link"><Link to={`/Blogs/Category/${Category}`} className="text-color-low">/ {Category}</Link>
</span>



                </div>
                <Link to={`/Blogs/${id}`} >see more </Link>
            </div>

        </div >


    )
}

export default Blog;
