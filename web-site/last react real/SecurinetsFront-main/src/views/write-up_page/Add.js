import React, { useState } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import "./TextEditor.css";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import styled from "styled-components";

function Add() {
    let date = new Date()
    const token = localStorage.getItem('token');
    let history = useHistory();
    const [userInfo, setuserInfo] = useState({
        title: '',
        blogContent: '',
        category: '',
        description: '',
        username: "/api/users/" + token,
        DateCreatedAt: date,
    });
    const ontitle = (e) => {
        setuserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        });
    }
    const oncategory = (e) => {
        setuserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        });
    }
    const ondescription = (e) => {
        setuserInfo({
            ...userInfo,
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
            if (userInfo.blogContent.length < 5) {
                setError('Required, Add content minimum length 50 characters');
                return;
            }
            console.log(userInfo);

            axios.post(`http://127.0.0.1:8000/api/blogs`, {
                title: userInfo.title,
                blogContent: userInfo.blogContent,
                category: userInfo.category,
                description: userInfo.description,
                username: userInfo.username,
                DateCreatedAt: userInfo.DateCreatedAt,
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
                                    <input type="text" name="title" value={userInfo.title} onChange={ontitle} className="form-control" placeholder="Title" required style={{ backgroundColor: "whitesmoke", borderRadius: "5px" }} />
                                </div>
                                <div className="form-group col-md-12">
                                    <label className="font-weight-bold" style={{ marginRight: "14vw" }} >Category<Span > * </Span>   </label>
                                    <select name="category" onChange={oncategory} style={{ borderRadius: "5px", paddingRight: "187px" }} >
                                        <option selected disabled hidden >Choose Category</option>
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
                                    <input type="text" name="description" value={userInfo.description} onChange={ondescription} className="form-control" placeholder="Description" required style={{ backgroundColor: "whitesmoke" }} />
                                </div>


                                <Clearfix ></Clearfix>
                                <div >
                                    <label className="font-weight-bold"> Content <Span > * </Span> </label>
                                    <Editor >
                                        <EditorToolbar toolbarId={'t1'} />
                                        <ReactQuill
                                            theme="snow"
                                            value={userInfo.blogContent}
                                            onChange={oncontent}
                                            placeholder={"Write something awesome..."}
                                            modules={modules('t1')}
                                            formats={formats}
                                        />
                                    </Editor>
                                </div>
                                <br />
                                <br />
                                {isError !== null && <div className="errors"> {isError} </div>}
                                <div >
                                    <button type="submit" className="btn btn-success btn-sm" > Submit  </button>
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



export default Add