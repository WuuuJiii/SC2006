import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory hook
import axios from 'axios';
import {message, Input} from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

import mainLogo from '../images/logo.png'
import username from '../images/user.png'
import password from '../images/lock.png'

/**
 * The Login component allows users to authenticate by entering their credentials.
 * If the authentication is successful, it stores the user's token in localStorage and redirects to the dashboard.
 * This component handles form data changes, submission, and navigates to different routes based on user actions.
 *
 * @param {Object} props - Component props.
 * @param {function} props.setIsAuthenticated - Function to update the authentication state of the user.
 * @returns {React.Component} - A form that allows users to log in.
 */

function Login({setIsAuthenticated}){
    const navigate = useNavigate(); // Get the history object

    const [formData, setFormData] = useState({ username: '', password: '' });

    /**
     * Handles changes to input fields by updating the component's state.
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
     * Handles the submission of the login form.
     * Performs a POST request to authenticate the user and navigate to the dashboard on success.
     * Displays errors through messages if authentication fails.
     * @param {Event} event - The form submission event.
     */

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const response = await axios.post('http://localhost:3000/auth/login', {
            email: formData.username,
            password: formData.password,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
            
        });
    
            const { token } = response.data;
            // console.log('Received token:', token);
            localStorage.setItem('token', token);
            message.success("Login successful")
            setIsAuthenticated(true);
            navigate('/dashboard');


        } catch (error) {
            console.error('Login error:', error);
            if (error.response) {
                console.error('Server responded with status:', error.response.status);
                if (error.response.status === 401) {
                    message.error('Invalid email or password');
                } else {
                    message.error(error.response.data.message || 'An error occurred. Please try again later.');
                }
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received:', error.request);
                message.error('No response received. Please check your internet connection.');
            } else {
                // Something happened in setting up the request that triggered an error
                console.error('Request setup error:', error.message);
                message.error('An error occurred. Please try again later.');
            }
        }
    };

    
    return(
        <>
            <div className="flex flex-col items-center ">
                <a href="/" className="self-start pl-3 pt-3">
                    <button type="button" 
                            className="text-white bg-blue-800 
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

                <div className="flex pt-[100px] pb-5">
                    <img src={mainLogo} className="h-12 pr-3" alt="Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">Sweet Home Finder</span>
                </div>

                <span className="text-3xl font-bold pb-5">Welcome!</span>

                <span className="text-2xl font-semibold text-slate-300 pb-5">Login to Account</span>
                
                <form onSubmit={handleSubmit}>
                    <div className="flex pb-5">
                        <img src={username} className="h-8 pr-2" alt="Username" />

                        <Input className="shadow appearance-none
                                        border rounded w-[300px] py-2 px-3 
                                        text-gray-700 leading-tight 
                                        focus:outline-none focus:shadow-outline" 
                                name="username" 
                                type="text" 
                                placeholder="Email Address"
                                value={formData.username}
                                onChange={handleInputChange}
                        />
                    </div>
                

                    <div className="flex pb-5">
                        <img src={password} className="h-7 pr-2" alt="Logo" />

                        <Input.Password className="shadow appearance-none
                                        border rounded w-[300px] py-2 px-3 
                                        text-gray-700 leading-tight 
                                        focus:outline-none focus:shadow-outline" 
                                name="password" 
                                type="password" 
                                placeholder="Password"
                                iconRender={(visible) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                                value={formData.password}
                                onChange={handleInputChange}
                        />
                    </div>
                    
                    <div className="pb-5">
                        <button 
                            type="submit"
                            className="w-[350px] h-[50px] rounded-md bg-blue-800 text-white font-bold text-2xl">Login</button>
                    </div>
                </form>

                <div className="flex pb-5">
                    <div className="pr-2">
                        <input id="remember-checkbox" type="checkbox" value="" 
                            className=" text-blue-600 
                            bg-gray-100 border-gray-300 rounded"/>
                    </div>
                    <label htmlFor="remember-checkbox" className="font-semibold pr-12">Remember Me</label>

                    <a href="/login/forget-password">
                        <span className="text-blue-700 font-bold">Forget Password?</span>
                    </a>
                </div>

                <div className="flex">
                    <span className="font-semibold pr-3">Don't have an account yet?</span>
                    <a href="/register">
                        <span className="text-blue-700  font-bold pr-3">Register</span>
                    </a>
                </div>
            </div>
        </>
    );
}

export default Login