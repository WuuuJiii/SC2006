import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { message, Typography, Input, Button } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const { Title } = Typography;

/**
 * Functions for the settings page under user dashboard
 * 
 * @param {*} userId - ID of the user who is currently logged in
 * @returns 
 */
const Settings = ({ userId }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const [currentPasswordValid, setCurrentPasswordValid] = useState(true);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);

    const [showNameSave, setShowNameSave] = useState(false);
    const [showEmailSave, setShowEmailSave] = useState(false);

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null); // Define token state

    // Fetch user details on component mount
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        setIsAuthenticated(storedToken !== null);
        setToken(storedToken); // Set token state
    }, []);

    /**
     * Fetches and sets current user details.
     */
    useEffect(() => {
        const fetchData = async () => {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                try {
                    const response = await axios.get(`http://localhost:3000/auth/${userId}`, {
                        headers: { Authorization: `Bearer ${storedToken}` },
                    });
                    setName(response.data.name);
                    setEmail(response.data.email);
                    // console.log(name);
                    // console.log(email);
                } catch (error) {
                    console.error('Error fetching account details:', error);
                }
            }
        };

        fetchData();
    }, []);

    /**
     * Runs whenever `newPassword` or `confirmNewPassword` changes
     * Validates the password confirmation to ensure there is no password mismatch
     * @returns {boolean} Whether the confirmed new password is valid.
     */
    useEffect(() => {
        validateConfirmPassword();
    }, [newPassword, confirmNewPassword]);

    /**
     * Validates the new password to ensure it meets length requirements.
     * @returns {boolean} Whether the new password is valid.
     */
    const validatePassword = () => {
        if (newPassword.length >= 6) {
            setPasswordError('');
            return true;
        }
        else{
            setPasswordError('Password must be at least 6 characters');
            return false;
        }
    };

    /**
     * Validates the confirmed password matches the new password.
     * @returns {boolean} Whether the confirmed password matches.
     */
    const validateConfirmPassword = () => {
        if (newPassword == confirmNewPassword) {
            setConfirmPasswordError('');
            return true;
        }
        else{
            setConfirmPasswordError('Passwords do not match');
            return false;
        }
    };

    /**
     * Attempts to update the user's name in the backend and provides feedback.
     * This function checks if the name field is not empty before sending a PATCH request
     * to the backend. If successful, it displays a success message and hides the save button.
     * In case of failure, an error message is displayed.
     */
    const saveName = async () => {
        if(name.length < 1){
            message.error('Name must not be empty');
        }
        try {
            console.log('Saving name:', name);
            await axios.patch('http://localhost:3000/auth/update-name', { name: name }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            message.success('Name updated successfully');
            setShowNameSave(false);
        } catch (error) {
                message.error('Failed to update name');
        }
    };

    /**
     * Updates the user's email by sending a PATCH request to the backend.
     * Checks for specific errors such as email already in use and displays appropriate messages.
     * On successful update, a success message is shown and the save button is hidden.
     */
    const updateEmail = async () => {
        try {
            console.log('Saving email:', email);
            await axios.patch('http://localhost:3000/auth/update-email', { email: email }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            message.success('Email updated successfully');
            setShowEmailSave(false);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                message.error(error.response.data.message);
                console.log(error);
            }
            else {
                message.error('Failed to update email');
            }
            console.log(error.response);
        }
    };

    /**
     * Validates and updates the user's password by sending a PATCH request to the backend.
     * Validates the new password and confirmation password before proceeding with the update.
     * Displays a success message upon successful update or an error message if the update fails.
     */
    const updatePassword = async () => {
        if (!validatePassword() || !validateConfirmPassword()) {
            message.error('Please correct the errors before saving.');
            return;
        }

        try {
            // Implement the API call to save the email
            console.log('Saving password');
                await axios.patch('http://localhost:3000/auth/update-password', { currentPassword: password, newPassword: newPassword }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            message.success('Password updated successfully');

            // Reset password fields and related validation states upon successful update
            setPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
            setCurrentPasswordValid(true);
            setPasswordError('');
            setConfirmPasswordError('');
        } catch (error) {
            // Reset validation states to true before setting specific errors
            setCurrentPasswordValid(true);
            setPasswordError(false);

            if (error.response && error.response.data && error.response.data.message) {
                if (error.response.data.message.includes('Current password is incorrect')) {
                    // Mark the current password as invalid
                    setCurrentPasswordValid(false);

                } else if (error.response.data.message.includes('New password cannot be the same as the old password')) {
                    // Mark the new password as having an error
                    setPasswordError('New password cannot be the same as the old password');
                }
                message.error(error.response.data.message);
            } else {
                // Generic error message if specific error message is not found
                message.error('Failed to update password. Please try again later.');
            }
        }
    };

    /**
     * Handles changes to the name input field and shows the save button.
     * @param {Event} e - The event object from the input field.
     */
    const handleNameChange = (e) => {
        setName(e.target.value);
        setShowNameSave(true);
    };

    /**
     * Handles changes to the email input field and shows the save button.
     * @param {Event} e - The event object from the input field.
     */
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setShowEmailSave(true);
    };

    /**
     * Handles changes to the new password input field, validates it, and sets appropriate errors.
     * @param {Event} e - The event object from the input field.
     * @returns {boolean} Indicates whether the new password is valid.
     */
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setNewPassword(newPassword);
        validateConfirmPassword();
        if(newPassword.length < 6) {
            setPasswordError("Password must be at least 6 characters long"); //Sets password error to be true
            return false;
        }
        else {
            setPasswordError(""); //Set password error to be false
            return true;
        }
    };

    /**
     * Updates the state to hold the value of the current password from its input field.
     * @param {Event} e - The event object from the input field.
     */
    const handleOldPassword = (e) => {
        setPassword(e.target.value);

    };

    /**
     * Handles changes to the confirm new password input field and validates it against the new password.
     * @param {Event} e - The event object from the input field.
     */
    const handleConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmNewPassword(newConfirmPassword);
        validateConfirmPassword();
    };

    /**
     * Renders a settings form for updating user information.
     *
     * This form allows users to update their name, email, and password.
     * Each section includes an input field and a "Save Changes" button.
     *
     * The form is structured into three main sections:
     * - Name Update
     * - Email Update
     * - Password Update
     *
     * Input validation and status messages are handled dynamically for user feedback.
     */
    return (
        // Main container for the settings form.
        <div style={{ flex: '1', margin: '5%' , boxSizing: 'border-box' }}>
            <div className='flex flex-col space-y-4'>
                {/* Name update section */}
                <Title level={4}>Name</Title>
                <div className='flex justify-between items-center'>
                    <Input
                        showCount
                        maxLength={20}
                        value={name}
                        onChange={handleNameChange}
                        onFocus={() => setShowNameSave(true)}
                        style={{ width: '45%' }}
                    />

                    <Button type="primary" onClick={saveName} style={{ backgroundColor: '#1890ff', color: 'white' }}>Save Changes</Button>
                </div>
                {/* Email update section */}
                <Title level={4}>Email</Title>
                <div className='flex justify-between items-center'>
                    <Input
                        value={email}
                        onChange={handleEmailChange}
                        onFocus={() => setShowEmailSave(true)}
                        style={{ width: '45%' }}
                    />

                    <Button type="primary" onClick={updateEmail} style={{ backgroundColor: '#1890ff', color: 'white' }}>Save Changes</Button>
                </div>
                {/* Password update section */}
                <Title level={4}>Modify Password</Title>
                <div className='flex justify-between items-start' >
                    <div className='flex justify-between items-start' style={{width: '80%'}}>
                        {/* Current password input */}
                        <div className='flex flex-col space-y-4' style={{width: '32%'}}>
                            <Input.Password
                                status={!currentPasswordValid ? "error" : ""}
                                placeholder="Current Password"
                                onChange={(e) => { handleOldPassword(e); setCurrentPasswordValid(true); }}
                                iconRender={(visible) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                                style={{width: '100%'}}
                            />
                        </div>
                        {/* New password input */}
                        <div className='flex flex-col space-y-4' style={{width: '32%'}}>
                            <Input.Password
                                placeholder="New Password"
                                onChange={(e) => {setPasswordError(false); handlePasswordChange(e) }}
                                iconRender={(visible) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                                style={{width: '100%'}}
                                status={passwordError ? "error" : ""}
                            />
                            {passwordError && <div style={{ color: 'red', fontSize: '14px'}}>{passwordError}</div>}
                        </div>
                        {/* Confirm new password input */}
                        <div className='flex flex-col space-y-4' style={{width: '32%'}}>
                            <Input.Password
                                placeholder="Confirm New Password"
                                onChange={(e) => {setConfirmPasswordError(false); handleConfirmPasswordChange(e)}}
                                iconRender={(visible) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                                style={{width: '100%'}}
                                status={confirmPasswordError ? "error" : ""}
                            />
                            {confirmPasswordError && <div style={{ color: 'red' , fontSize: '14px'}}>{confirmPasswordError}</div>}
                        </div>
                    </div>
                    <div className='flex justify-between items-center' style={{justifyContent: 'flex-end'}}>
                        <Button type="primary" onClick={updatePassword} style={{backgroundColor: '#1890ff', color: 'white'}}>Save
                            Changes</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings; 
