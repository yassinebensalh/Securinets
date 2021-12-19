import React from "react";
const Blog = ({ username, description }) => {
    return (
        <div className="tiles-item " data-reveal-delay="200" >
            <div className="tiles-item-inner" >{username}
                <div className="testimonial-item-content" >
                    <p style={{ width: "200px", color: "red", wordWrap: "break-word" }}>
                        {description}
                    </p>

                </div>
                <div className="testimonial-item-footer text-xs mt-32 mb-0 has-top-divider">
                    <span className="testimonial-item-name text-color-high"></span>
                    <span className="text-color-low"> / </span>
                    <span className="testimonial-item-link">
                        <a href="/CTF"></a>
                    </span>
                </div>
                <a href="/CTF"></a>

            </div>
        </div>
    )
}

export default Blog;