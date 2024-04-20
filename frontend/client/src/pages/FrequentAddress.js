import React, { useState, useEffect } from 'react';

import { Modal, Button } from 'antd';

import MapAutocomplete from '../components/MapAutocomplete';

/**
 * Component for managing frequently visited locations.
 * It allows users to view, add, and delete frequently visited addresses.
 * Addresses can be added through an interactive map autocomplete component.
 *
 * @param {Object} props - Component props.
 * @param {string} props.userId - ID of the user to fetch locations for and modify them.
 * @returns {React.Component} - A component displaying a list of frequently visited addresses.
 */

const FrequentLocations = ({ userId }) => {
    const [frequentAddresses, setFrequentAddresses] = useState([]);
    const [expandedLocationId, setExpandedLocationId] = useState(null);

    // for add freq ------------------------ maybe issue (location part)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState();
    const [isHovering, setIsHovering] = useState(false);


    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    /**
     * Fetches the list of frequent addresses from the server when the component mounts or when dependencies change.
     */

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && userId) {
            fetch(`http://localhost:3000/frequentaddress/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // console.log('Frequent addresses:', data);
                setFrequentAddresses(data); 
            })
            .catch(error => {
                console.error('Error fetching frequent addresses:', error);
            });
        }
    }, [userId, selectedPlace, isModalVisible]);    //updates whenever a new location is added

    /**
     * Toggles the expanded state of a location detail view.
     *
     * @param {string} id - The ID of the location to toggle.
     */

    const toggleDetails = (id) => {
        setExpandedLocationId(expandedLocationId === id ? null : id);
    };
    
   /**
     * Deletes a specific frequent address (button)
     *
     * @param {object} location - The location object to delete.
     */

    const handleDelete = async (location) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:3000/frequentaddress/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ location }) 
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            setFrequentAddresses(frequentAddresses.filter(item => item !== location));
        } catch (error) {
            console.error('Error deleting address:', error);
        }
    };


/**
     * Adds a new frequent address from the selected place in the autocomplete component.
     */
        const handleAddFrequentAddress = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:3000/frequentaddress/${userId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ location: selectedPlace})
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            setIsModalVisible(false);
            // console.log(selectedPlace);
        } catch (error) {
            console.error('Error adding new frequent address:', error);
        }
    };

    // autocomplete addfreq -------------------- added this after the maps

    return (
        <div className="w-full overflow-y-auto h-[87vh]">
            {frequentAddresses.map((address, index) => (
                <div key={index} className="flex items-center justify-between p-4 border-b border-gray-300">
                    <div className="flex-grow">
                        <p className="text-lg font-semibold text-blue-600">{address}</p>
                    </div>
                    <button 
                        onClick={() => handleDelete(address)} 
                        className="text-white bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded"
                    >
                        Delete
                    </button>
                    
                </div>
            ))}
            <style>
                {`
                    .add-modal .ant-btn-primary {
                        background-color: #1890ff;
                        border-color: #1890ff;
                    }

                    .add-modal .ant-btn-primary:hover {
                        background-color: #0050b3;
                        border-color: #0050b3;
                    }
                `} </style>
            <div className='flex justify-center'>
                <Button
                    type="primary"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    className="text-[#ffffff] mt-[5vh] mb-[5vh] font-semibold"
                    style={{
                        backgroundColor: isHovering ? '#0050b3' : '#1890ff', // blue button 
                        borderColor: isHovering ? '#0050b3' : '#1890ff', 
                    }}
                    onClick={showModal}
                >
                    Add Frequent Address
                    
                </Button>
            </div>
            <Modal
                className="add-modal"
                title="Add New Frequent Address"
                open={isModalVisible}
                onOk={() => handleAddFrequentAddress()}
                onCancel={() => setIsModalVisible(false)}
                okText="Add"
                centered
                width={'70vw'}
            >
                <div className="flex justify-center">
                    <MapAutocomplete
                        setSelectedPlace={setSelectedPlace}/>      
                        {/* might be the issue */}
                </div> 
            </Modal>
        </div>
    );
};

export default FrequentLocations;
