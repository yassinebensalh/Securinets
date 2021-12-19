import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';



class SignInForm extends Component {
    constructor() {
        super();

        this.state = {
            username: "",
            password: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let target = event.target;
        let value = target.type === "checkbox" ? target.checked : target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        console.log("The form was submitted with the following data:");
        console.log(this.state);

        try {

            axios.post(`http://127.0.0.1:8000/api/login`, this.state)
                .then(res => {
                    if (res.data.success === true) {
                        localStorage.setItem('token', res.data.id)
                        localStorage.setItem('username', res.data.username)
                        window.location = '/';
                    }
                })
        } catch (error) { throw error; }
    }



    render() {
        return (
            <div className="formCenter">
                <form className="formFields" onSubmit={this.handleSubmit}>
                    <div className="formField">
                        <label className="formFieldLabel" htmlFor="email">
                            E-Mail Address
                        </label>
                        <input
                            type="email"
                            id="username"
                            className="formFieldInput"
                            placeholder="Enter your email"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="formField">
                        <label className="formFieldLabel" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="formFieldInput"
                            placeholder="Enter your password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="formField">
                        <button className="formFieldButton">Sign In</button>{" "}
                        <Link to="/sign-up" className="formFieldLink">
                            Create an account
                        </Link>
                    </div>


                </form>
            </div>
        );
    }
}

export default SignInForm;
