import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import "./TextEditor.css";
import { useHistory, useParams } from "react-router-dom";
import axios from 'axios';
import styled from "styled-components";


function Edit() {
    let date = new Date()
    const token = localStorage.getItem('token');
    let history = useHistory();


    const { id } = useParams();
    let decoded_id = atob(id);
    const [BlogContent, setBlogContent] = useState([]);
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/oneBlog/${id}`)
            .then(res => setBlogContent(res.data[0]))
    }, [])



     const [userInfo, setuserInfo] = useState({
        title: "",
        blogContent: "",
        category: "",
        description: "",
        username: "/api/users/" + token,
        DateCreatedAt: date,

    }); 
    



    const ontitle = (e) => {
      
        setuserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        });

        setBlogContent({
            ...BlogContent,
            [e.target.name]: e.target.value
        });
    }



    const oncategory = (e) => {
       
      
        setuserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        });
        setBlogContent({
            ...BlogContent,
            [e.target.name]: e.target.value
        });
      
    }
    const ondescription = (e) => {
       
        setuserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        });
        setBlogContent({
            ...BlogContent,
            [e.target.name]: e.target.value
        });
    }

   const oncontent = (value) => {
       
        setuserInfo({
            ...userInfo,
            blogContent: value
        });
    }

    const [isError, setError] = useState(null);
    const addDetails = async (event) => {
        try {

            event.preventDefault();
            event.persist();
            
            axios.put(`http://127.0.0.1:8000/api/blogs/${decoded_id}`, {
                title: userInfo.title || BlogContent.title,
                blogContent: userInfo.blogContent || BlogContent.blogContent,
                Category: userInfo.category || BlogContent.category ,
                description: userInfo.description || BlogContent.description,
                username: userInfo.username || BlogContent.username,
            })

                .then(res => {
                    if (res.data.success === true) {
                        history.push('/');
                    }
                })
        } catch (error) { throw error; }
    } 
    return (
        <>
            <App >
                <div className="container">
                    <div className="row">
                        <Form onSubmit={addDetails} >
                            <h3 className="myaccount-content"> Write-Up </h3>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label className="font-weight-bold" style={{ marginRight: "3vw" }} > Title <Span > * </Span>   </label>
                                    <input type="text" name="title" value={ userInfo.title ? userInfo.title : BlogContent.title  }  onChange={ontitle} className="form-control" placeholder="Title" required style={{ backgroundColor: "whitesmoke", borderRadius: "5px" }} />
                                </div>
                                <div className="form-group col-md-12">
                                    <label className="font-weight-bold" style={{ marginRight: "14vw" }} >Category<Span > * </Span>   </label>
                                    <select name="category" value={ userInfo.category ? userInfo.category : BlogContent.Category  } onChange={oncategory} style={{ borderRadius: "5px", paddingRight: "187px" }} >
                                        <option selected disabled hidden ></option>
                                        <option value="Forensics">Forensics</option>
                                        <option value="Cryptography" >Cryptography</option>
                                        <option value="Web Exploitation">Web Exploitation</option>
                                        <option value="Binary Exploitation">Binary Exploitation</option>
                                        <option value="Reverse Engineering">Reverse Engineering</option>
                                        <option value="Misc">Misc</option>

                                    </select>
                                </div>

                                <div className="form-group col-md-12">
                                    <label className="font-weight-bold">Description<Span > * </Span> </label>
                                    <input type="text" name="description" value={ userInfo.description ? userInfo.description : BlogContent.description  } onChange={ondescription} className="form-control" placeholder="Description" required style={{ backgroundColor: "whitesmoke" }} />
                                </div>


                                <Clearfix ></Clearfix>
                                {BlogContent.blogContent? (<>
                                    <div >
                                    <label className="font-weight-bold"> Content <Span > * </Span> </label>
                                    <Editor >
                                        <EditorToolbar toolbarId={'t1'} />
                                        <ReactQuill
                                            theme="snow"
                                            value={ userInfo.blogContent ? userInfo.blogContent : BlogContent.blogContent  }
                                            onChange={oncontent}
                                            placeholder={"Write something awesome..."}
                                            modules={modules('t1')}
                                            formats={formats}
                                        />
                                    </Editor>
                                </div>
                                </>)
                                :
                                (<>
                                 <div>Loading Content, please wait...</div>
                                 <br />
                                </>)
                                }
                                <br />
                                <br />
                                {isError !== null && <div className="errors"> {isError} </div>}
                                <div >
                                    <button type="submit" className="btn btn-success btn-sm" > Update  </button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </App>
        </>
    )
}


const App = styled.div`
position: relative;
  float: left;
  width: 100%;
  display: block;
  padding: 70px 0;
  margin: 70px 0;
`;

const Editor = styled.div`
background-color: whitesmoke;
color:black;
width: 55vw;
`;


const Form = styled.form`


padding: 37px;

`;

const Span = styled.span`
color: #f44336;
`;


const Clearfix = styled.div`
clear:both;

`;



export default Edit