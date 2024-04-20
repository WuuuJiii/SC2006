import React, { useState } from 'react';

import { message, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';

import mainLogo from '../images/logo.png'

/**
 * The Register component handles new user registration, allowing users to enter their details
 * such as name, email, password, and a security question. It validates the inputs, submits the registration
 * form, and handles responses from the server.
 *
 * @returns {React.Component} - A form that allows new users to register.
 */

function Register(){
    const [formData, setFormData] = useState({ name: '', email: '', password: '' , confirmPassword: '', security: '' });

/**
     * Updates the form data state upon input changes.
     * @param {Event} event - The input change event.
     */

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

     /**
     * Handles the submission of the registration form.
     * Validates the input fields, makes a POST request to the server, and processes the response.
     * @param {Event} event - The form submission event.
     */
    
    const handleSubmit = async (event) => {
        event.preventDefault();
            // Ensure no field is empty
        if (!formData.name || !formData.email || !formData.password ||
            !formData.confirmPassword || !formData.security) {
            message.error('All fields are required');
            return;
        }

        // Ensure valid email
        // You can use a simple regex for email validation
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(formData.email)) {
            message.error('Invalid email');
            return;
        }

        // Ensure password and confirmPassword are the same
        if (formData.password !== formData.confirmPassword) {
            message.error('Passwords do not match');
            return;
        }

        // Ensure password and confirmPassword are the same
        if (formData.password.length < 6) {
            message.error('Password must be more than 6 characters long');
            return;
        }

        try {
            // Send a POST request to the /signup endpoint of your backend API
            const response = await fetch('http://localhost:3000/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                // Attempt to read the error message from the response body
                const errorData = await response.json();
                // Use the error message from the backend or a default message
                const errorMessage = errorData.message || 'Failed to register for an account.';
                // Log the error message for debugging purposes
                console.log('Register failed:', errorMessage);
                // Display the error message to the user
                message.error(errorMessage);
                return; // Prevent further execution in case of error
            }

            const data = await response.json();
            console.log('Register form submitted:', data);
            message.success('Registration succeeded');
            window.location.href = '/login';

        } catch (error) {
            // This catch block is now more focused on handling network errors or
            // errors in the execution of the fetch itself, not HTTP error statuses
            console.error('An unexpected error occurred:', error);
            message.error('An unexpected error occurred while trying to register.');
        }
    };

    return(
        <>
            <div className="flex flex-col items-center ">
                <a href="/" className="self-start pl-3 pt-3">
                    <button type="button" className="text-white bg-blue-800 
                                                hover:bg-blue-800 focus:ring-4 focus:outline-none 
                                                focus:ring-blue-300 font-medium rounded-full 
                                                text-sm p-2.5 text-center inline-flex 
                                                items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 
                                                dark:focus:ring-blue-800
                                                pr">
                        <svg className="w-5 h-5 rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                        <span className="sr-only">Icon description</span>
                    </button>
                </a>

                <div className="flex pt-[50px] pb-5">
                    <img src={mainLogo} className="h-12 pr-3" alt="Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">Sweet Home Finder</span>
                </div>

                <span className="text-3xl font-bold pb-5">Welcome!</span>

                <span className="text-2xl font-semibold text-slate-300 pb-5">Create an Account</span>
                <form onSubmit={handleSubmit} style={{width: '30%', minWidth: '300px'}}>
                    <div className="flex flex-row pb-5 "
                         style={{justifyContent: 'space-around', width: '100%', alignItems: 'center'}}>
                        <UserOutlined style={{fontSize: '25px'}}/>
                        <Input className="shadow appearance-none
                                border rounded w-[85%] py-2 px-3
                                text-gray-700 leading-tight
                                focus:outline-none focus:shadow-outline"
                               name="name"
                               type="text"
                               placeholder="Name"
                               value={formData.name}
                               onChange={handleInputChange}
                        />
                    </div>

                    <div className="flex flex-row pb-5 "
                         style={{justifyContent: 'space-around', width: '100%', alignItems: 'center'}}>
                        <MailOutlined style={{fontSize: '25px'}}/>
                        <Input className="shadow appearance-none
                                    border rounded w-[85%] py-2 px-3
                                    text-gray-700 leading-tight
                                    focus:outline-none focus:shadow-outline"
                               name="email"
                               type="text"
                               placeholder="Email Address"
                               value={formData.email}
                               onChange={handleInputChange}
                        />
                    </div>

                    <div className="flex flex-row pb-5 "
                         style={{justifyContent: 'space-around', width: '100%', alignItems: 'center'}}>
                        <LockOutlined style={{fontSize: '25px'}}/>
                        <Input.Password className="shadow appearance-none
                                        border rounded w-[85%] py-2 px-3
                                        text-gray-700 leading-tight 
                                        focus:outline-none focus:shadow-outline"
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        iconRender={(visible) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                        />
                    </div>

                    <div className="flex flex-row pb-5 "
                         style={{justifyContent: 'space-around', width: '100%', alignItems: 'center'}}>
                        <LockOutlined style={{fontSize: '25px'}}/>
                        <Input.Password className="shadow appearance-none
                                        border rounded w-[85%] py-2 px-3
                                        text-gray-700 leading-tight 
                                        focus:outline-none focus:shadow-outline"
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="Confirm Password"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        iconRender={(visible) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                        />
                    </div>
                    {/*Security Question Field*/}
                    <div className="flex flex-row pb-2 "
                         style={{justifyContent: 'center', width: '100%', alignItems: 'center'}}>
                        <span style={{fontWeight: 'bold', marginRight: '8px'}}>Security Question</span>
                        <span>What's your pet's name?</span>
                    </div>
                        <div className="flex flex-row pb-5 "
                             style={{justifyContent: 'space-around', width: '100%', alignItems: 'center'}}>
                            <LockOutlined style={{fontSize: '25px'}}/>
                            <Input className="shadow appearance-none
                                        border rounded w-[85%] py-2 px-3
                                        text-gray-700 leading-tight
                                        focus:outline-none focus:shadow-outline"
                                            name="security"
                                            type="text"
                                            placeholder="Answer"
                                            value={formData.security}
                                            onChange={handleInputChange}
                            />
                        </div>

                        <div className="pb-5">
                            <button
                                type="submit"
                                className="h-[50px] rounded-md bg-blue-800 text-white font-bold text-2xl"
                                style={{width: '100%'}}>
                                Sign Up
                            </button>
                        </div>
                </form>

                <div className="flex pb-5">
                    <span className=" font-semibold pr-12">Already have an account?</span>
                    <a href="/login">
                        <span className="text-blue-800 font-semibold">Login</span>
                    </a>

                </div>
            </div>
        </>
    );
}

export default Register