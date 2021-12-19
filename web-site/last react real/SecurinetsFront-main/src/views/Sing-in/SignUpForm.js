import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';


class SignUpForm extends Component {
    constructor() {
        super();

        this.state = {
            email: "",
            plainPassword: "",
            firstname: "",
            lastname: "",
            username: "",
            phoneNumber: "",
            roles: ["ROLE_USER"],

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

    async handleSubmit(e) {
        e.preventDefault();

        console.log("The form was submitted with the following data:");
        console.log(this.state);
        try {
            this.state.phoneNumber = parseInt(this.state.phoneNumber);
            axios.post(`http://127.0.0.1:8000/api/users`, this.state)
                .then(res => {
                    if (res.data.success === true) {
                        window.location = '/Auth#/sign-in';
                    }
                })
        } catch (error) { throw error; }
    }

    render() {
        return (
            <div className="formCenter">
                <form onSubmit={this.handleSubmit} className="formFields">
                    <div className="formField">
                        <label className="formFieldLabel" htmlFor="name">
                            First name
                        </label>
                        <input
                            type="text"
                            id="firstname"
                            className="formFieldInput"
                            placeholder="Enter your first name"
                            name="firstname"
                            value={this.state.firstname}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <div className="formField">
                        <label className="formFieldLabel" htmlFor="name">
                            Last name
                        </label>
                        <input
                            type="text"
                            id="lastname"
                            className="formFieldInput"
                            placeholder="Enter your last name"
                            name="lastname"
                            value={this.state.lastname}
                            onChange={this.handleChange}
                            required

                        />
                    </div>
                    <div className="formField">
                        <label className="formFieldLabel" htmlFor="name">
                            Username
                        </label>
                        <input
                            type="tel"
                            id="username"
                            className="formFieldInput"
                            placeholder="Enter your username"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                            required

                        />
                    </div>
                    <div className="formField">
                        <label className="formFieldLabel" htmlFor="name">
                            phone
                        </label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            className="formFieldInput"
                            placeholder="123-45-678"
                            name="phoneNumber"
                            value={this.state.phoneNumber}
                            onChange={this.handleChange}
                            required
                            maxLength="8"
                            minLength="8"

                        />
                    </div>

                    <div className="formField">
                        <label className="formFieldLabel" htmlFor="email">
                            E-Mail Address
                        </label>
                        <input
                            type="text"
                            id="email"
                            className="formFieldInput"
                            placeholder="Enter your email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            required

                        />
                    </div>
                    <div className="formField">
                        <label className="formFieldLabel" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="plainPassword"
                            className="formFieldInput"
                            placeholder="Enter your password"
                            name="plainPassword"
                            value={this.state.plainPassword}
                            onChange={this.handleChange}
                            required

                        />
                    </div>
                    <div className="formField">
                        <button className="formFieldButton">Sign Up</button>{" "}
                        <Link to="/sign-in" className="formFieldLink">
                            I'm already member
                        </Link>
                    </div>
                </form>
            </div>
        );
    }
}
export default SignUpForm;
