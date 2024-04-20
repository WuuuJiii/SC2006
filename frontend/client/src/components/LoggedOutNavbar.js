import React from 'react';
import { useNavigate } from 'react-router-dom';

import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Avatar } from 'antd';

import mainLogo from '../images/logo.png';

import Searchbar from './Searchbar';

/**
 * Navbar only visible by logged out users
 * 
 * @param {*} formValues - values within the search bar 
 * @returns 
 */
function LoggedOutNavbar({formValues}) {
    const navigate = useNavigate();

    const handleMenuClick = (e) => {
        console.log('click', e);
        switch (e.key) {
            case '1':
                navigate('/login');
                break;
            case '2':
                navigate('/register');
                break;
            case '3':
                navigate('/FAQ');
                break;
            default:
                break;
            }
        };
        
    const items = [
        {
            label: 'Login',
            key: '1',
        },
        {
            label: 'Sign Up',
            key: '2',
        },
        {
            label: 'FAQ',
            key: '3',
        },
    ];

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    return (
        <nav className="bg-white border-gray-200
                        sticky shadow-lg
                        top-0 z-50
                        h-[13vh]">
            <div className="w-[100%] max-w-screen-xl 
                            flex flex-wrap 
                            items-center justify-between 
                            mx-auto h-[13vh]">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={mainLogo} className="h-12 ml-4" alt="Logo"/>
                </a>
                <div className="w-[75%] h-[70%]">
                    <Searchbar initialValues={formValues}/>
                </div>
                <div className="w-[7%] h-[70%] mr-3">
                    <Dropdown menu={menuProps}
                        className="border rounded-[100px] shadow-md">
                        <Button className="h-[100%] w-[100%]">
                            <Avatar size="large" 
                                    className="text-blue-700 bg-[#F4F4F4]" 
                                    icon={<UserOutlined/>}/>
                            <DownOutlined/>
                        </Button>
                    </Dropdown>
                </div>
            </div>
        </nav>

    );
}

export default LoggedOutNavbar;
