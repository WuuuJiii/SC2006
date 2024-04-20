import React, { useState } from 'react';
import axios from 'axios';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { Button, Input, message, Result } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

import mainLogo from '../images/logo.png'; // Ensure this path is correct

/**
 * Defines the initial values for the Forgot Password form fields.
 * @type {Object}
 */
const initialValues = {
    email: '',
    securityAnswer: '',
};

/**
 * Sets up a validation schema using Yup to ensure that the form data
 * meets certain requirements before being submitted.
 */
const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    securityAnswer: Yup.string().required('Answer is required'),
});

/**
 * A functional component that renders a form for users to reset their password.
 * Users are required to provide their email and answer a security question.
 * If the credentials are validated successfully, their password will be reset.
 *
 * State Hooks:
 * - passwordReset (boolean): To track the success status of the password reset operation.
 * - resetMessage (string): To hold the message to be displayed upon password reset.
 *
 * The form uses Formik for form handling and Yup for validation.
 */
const ForgotPassword = () => {
    const [passwordReset, setPasswordReset] = useState(false);
    const [resetMessage, setResetMessage] = useState('');

    /**
     * Handles the form submission. Validates the user's credentials and attempts to reset the password.
     * If successful, displays a success message and resets the form. Otherwise, displays an error message.
     *
     * @async
     * @function handleSubmit
     * @param {Object} values - The form values.
     * @param {Object} formikHelpers - The set of Formik actions and helpers.
     */
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const response = await axios.patch('http://localhost:3000/auth/forgetpassword', values);
            // If backend returns a success message
            message.success(response.data || 'Password reset successfully.');
            setPasswordReset(true);
            setResetMessage(response.data || 'Password reset successfully.');
            resetForm();
        } catch (error) {
            message.error(error.response?.data?.message || 'Failed to reset password.');
            setPasswordReset(false);
        } finally {
            setSubmitting(false);
        }
    };

    /**
     * Displays a success message if the password has been reset successfully.
     *
     * This component conditionally renders a success message using Ant Design's `Result` component if
     * the password reset operation was successful. If not, it renders a form allowing the user to reset
     * their password by providing their email and answering a security question.
     *
     * @returns {React.Component} A `Result` component displaying a success message or a form for resetting the password.
     */
    if (passwordReset) {
        return (
            <Result
                status="success"
                title={<span className="text-3xl font-bold pb-5">Password Reset Successfully!</span>}
                subTitle={resetMessage}
                extra={[
                    <Button type="primary" key="login" href="/login">
                        Login
                    </Button>,
                ]}
            />
        );
    }

    /**
     * Styles the error message for input fields.
     */
    const errorStyle = {
        color: 'red', // Red color for errors
        marginTop: '4px', // Some space above the error message
        fontSize: 'clamp(14px, 1.5vw, 18px)'
    };

    return (
        // Main container for the Forgot Password page, centered both vertically and horizontally.
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            {/* Back to Home button with an icon */}
            <a href="/" className="self-start pl-3 pt-3">
                <button type="button" className="text-white bg-blue-800
                                                hover:bg-blue-800 focus:ring-4 focus:outline-none
                                                focus:ring-blue-300 font-medium rounded-full
                                                text-sm p-2.5 text-center inline-flex
                                                items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700
                                                dark:focus:ring-blue-800
                                                pr">
                    <svg className="w-5 h-5 rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                         fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M1 5h12m0 0L9 1m4 4L9 9"/>
                    </svg>
                    <span className="sr-only">Icon description</span>
                </button>
            </a>
            {/* Logo and title for the page */}
            <div className="flex pt-[100px] pb-5">
                <img src={mainLogo} className="h-12 pr-3" alt="Logo"/>
                <span
                    className="self-center text-2xl font-semibold whitespace-nowrap text-black">Sweet Home Finder</span>
            </div>

            {/* Page Header */}
            <span className="text-3xl font-bold pb-5">Forget Your Password?</span>

            {/* Formik component for handling the form submission and validation */}
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({values, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
                    <Form onSubmit={handleSubmit} style={{width: '30%', minWidth: '300px'}}>
                        {/* SECTION Email input field with an email icon */}
                        <div style={{marginBottom: '15px'}}>
                            <Field name="email">
                                {({field}) => (
                                    <Input
                                        {...field}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        prefix={<MailOutlined style={{marginRight: '8px'}}/>}
                                        placeholder="Email"
                                    />
                                )}
                            </Field>
                            <ErrorMessage name="email" component="div" className="error-message" style={errorStyle}/>

                        </div>
                        {/* SECTION Security question */}
                        {/* Security question */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            margin: '10px 0'
                        }}>
                            <span style={{fontWeight: 'bold', marginRight: '8px', fontSize: 'clamp(14px, 1.5vw, 18px)'}}>Security Question</span>
                            <span>What's your pet's name?</span>
                        </div>
                        {/* Security answer input field with a lock icon */}
                        <Field name="securityAnswer">
                            {({field}) => (
                                <Input
                                    {...field}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.securityAnswer}
                                    placeholder="Your answer"
                                    prefix={<LockOutlined style={{marginRight: '8px'}}/>}
                                />
                            )}
                        </Field>
                        <ErrorMessage name="securityAnswer" component="div" className="error-message" style={errorStyle}/>

                        {/* SECTION Submit button for the form */}
                        <div style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center', // Horizontally center
                            alignItems: 'center', // Vertically center
                            marginTop: '15px'
                        }}>
                            <button class=" h-[50px] rounded-md bg-blue-800 text-white font-bold text-xl" style={{
                                color: 'white',
                                width: '100%',
                                margin: '10px 0'
                            }} loading={isSubmitting}>
                                Reset Password
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ForgotPassword;