import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

import LoggedInNavbar from '../components/LoggedInNavbar';
import SavedProperties from './SavedProperties'; 
import FrequentLocations from './FrequentAddress';
import Settings from '../components/Settings';

import { jwtDecode } from 'jwt-decode';

import { Menu, Layout } from 'antd'

const { Sider } = Layout;

/**
 * Represents the main dashboard page for authenticated users.
 * Provides navigation to various sections like Saved Properties, Frequently Visited Addresses, and Settings.
 *
 * @param {boolean} isAuthenticated - Indicates if the user is authenticated
 * @returns {React.Component} - The Dashboard component with dynamic content based on user interaction.
 */

function Dashboard({isAuthenticated}) {
    const [activeSection, setActiveSection] = useState('savedProperties');
    const [userId, setUserId] = useState(null);

/**
     * Decode the JWT from localStorage to find the user's ID.
     * This effect runs on initial mount and when isAuthenticated or userId changes.
     */

    useEffect(() => {
        const token = localStorage.getItem('token');
        
        if (token) {
            const decodedToken = jwtDecode(token);
            setUserId(decodedToken.id);
        } else {
            console.log('No token found in local storage');
        }
        
    }, [isAuthenticated, userId]);
    
    /**
     * Handles user's navigation through the dashboard menu.
     * Sets the current active section based on menu item clicked.
     *
     * @param {string} key - The key of the menu item clicked.
     */

    const handleMenuClick = (key) => {
        setActiveSection(key);
    };

    /**
     * Dynamically renders the content based on the active section.
     * Displays user-specific information fetched from the server.
     * @returns {React.Component} - The component corresponding to the active menu section.
     */

    const renderContent = () => {
        if (!userId) {
            return <div>Loading...</div>;
        }
    
        switch (activeSection) {
            case 'savedProperties':
                return <SavedProperties userId={userId} />;
            case 'frequentlyVisited':
                return <FrequentLocations userId={userId} />;
            case 'settings':
                return <Settings userId={userId} />;
            default:
                return <div>Select a section</div>;
        }
    };

    return (
        <>
            <LoggedInNavbar />

            <div className="flex" >
                <Sider width={250} className='bg-gray-50 h-[87vh]'>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['savedProperties']}
                        className='h-full border-0 bg-gray-50 font-semibold text-1xl'
                        style={{ height: '100%', borderRight: 0 }}
                        onClick={({ key }) => handleMenuClick(key)}
                        items = {[
                            {
                                key: 'savedProperties',
                                label: 'Saved Properties',
                            },
                            {
                                key: 'frequentlyVisited',
                                label: 'Frequently Visited',
                            },
                            {
                                key: 'settings',
                                label: 'Settings',
                            },
                            
                        ]}
                    />
                </Sider>

                <div className="flex-grow">
                    {renderContent()}
                </div>
            </div>
        </>
    );
}

export default Dashboard; 


