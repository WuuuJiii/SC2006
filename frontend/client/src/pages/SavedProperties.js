import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

/**
 * The SavedProperties component displays a list of properties saved by the user.
 * It allows the user to view more details about each property, delete them from saved properties,
 * and navigate to a detailed view of the property.
 *
 * @param {Object} props - Component props.
 * @param {string} props.userId - The unique identifier for the user to fetch saved properties.
 * @returns {React.Component} - A component that lists saved properties and provides interaction options.
 */

const SavedProperties = ({ userId }) => {

    const [savedProperties, setSavedProperties] = useState([]);
    const [residences, setResidences] = useState([]);
    const [expandedPropertyId, setExpandedPropertyId] = useState(null);
    const [propertiesExist, setSavedPropertiesExist] = useState(false);

     /**
     * Toggles the expanded view of property details.
     * @param {string} id - The unique identifier of the property to expand or collapse.
     */

    const toggleDetails = (id) => {
        if (expandedPropertyId === id) {
            setExpandedPropertyId(null); 
        } else {
            setExpandedPropertyId(id); 
        }
    };    

    /**
     * Fetches the saved properties for the user and the details of each property.
     * Executes when the component mounts or the userId changes.
     */

    //retrieve id of saved properties from bookmark
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && userId) { 
            fetch(`http://localhost:3000/bookmark/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    if(response.status === 404) {
                        setSavedPropertiesExist(false);
                        throw new Error('No properties saved');
                    }
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    setSavedProperties(data);
                    setSavedPropertiesExist(data.length > 0);
                    return Promise.all(data.map(id => {
                        return fetch(`http://localhost:3000/testData/${id}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        })
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('Network response was not ok');
                                }
                                return response.json();
                            });
                    }));
                })
                .then(residencesData => {
                    setResidences(residencesData);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [userId, savedProperties]);
    
    /**
     * Deletes a property from the user's saved properties.
     * @param {string} propertyId - The unique identifier of the property to delete.
     */

    //retrieve object of resale based on id
    const handleDelete = async (propertyId) => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:3000/bookmark/${userId}/${propertyId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error deleting property:', error);
        }
    };

    const navigate = useNavigate();
    const defaultInitialValues = {
        location: [],
        propertyType: [],
        amenities: [],
        budget: [],
        rooms: []
    };
    
    /**
     * Navigates to the property detail page to show more details about a specific property.
     * @param {string} propertyId - The unique identifier of the property to display.
     */
    
    //show saved property on explore page
    const handleShow = async (propertyId) => {
        try {
            navigate('/property',
            { state: { selectedId: propertyId }})

            console.log('Show property:', propertyId)
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='w-full overflow-y-auto h-[87vh]'>
            {!propertiesExist ? (
                <div className="flex justify-center">
                    <span className="font-semibold text-2xl mt-[5vh]">
                        No properties saved
                    </span>
                </div>
            ) : (
                residences.map((property) => (
                    <div key={property._id} className="border-b border-gray-300 p-4 w-full">
                        <div className="flex justify-between items-center">
                            <div
                                onClick={() => toggleDetails(property._id)}
                                className="cursor-pointer text-blue-600 font-semibold"
                            >
                                {property.town}
                            </div>
                            <div>
                                <button
                                    onClick={() => handleShow(property._id)}
                                    className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded mr-2"
                                >
                                    Show
                                </button>
                                <button
                                    onClick={() => handleDelete(property._id)}
                                    className="text-white bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                        <div className="text-gray-500">{property.flat_type} {property.property_type}</div>
                        {expandedPropertyId === property._id && (
                            <div className="mt-4">
                                <div>Price: ${property.resale_price.toLocaleString()}</div>
                                <div>Type: {property.flat_type}</div>
                                <div>Street: {property.street_name}</div>
                                <div>Floor area: {property.floor_area_sqm} sqm</div>
                                {/* Add more Info to display if we want */}
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
    
};

export default SavedProperties; 