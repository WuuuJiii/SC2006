import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import { Layout } from 'antd';


import LoggedInNavbar from '../components/LoggedInNavbar';
import LoggedOutNavbar from "../components/LoggedOutNavbar";
import Map from '../components/Map';
import SearchResultsBar from '../components/SearchResultsBar';
import ExploreRightBar from '../components/ExploreRightBar';

const { Content } = Layout;

/**
 * The Explore component is the main interface for exploring properties.
 * It allows users to view properties on a map, filter and sort search results, and view detailed information about a property.
 * It handles user authentication states to toggle between logged-in and logged-out views.
 *
 * @param {boolean} isAuthenticated - Indicates if the user is authenticated.
 * @returns {React.Component} - The Explore component with dynamic, interactive features based on user input and authentication.
 */

function Explore({isAuthenticated}) {

    const location = useLocation();
    const responseData = location.state.responseData;
    const formValues = location.state.formValues;

    const [selectedResale, setSelectedResale] = useState(null);
    const [selectedProperty, setSelectedProperty] = useState(false);

    const [showLeftBar, setShowLeftBar] = useState(true);

    /**
     * Handles user clicks on individual property divs to display detailed information.
     * Sets the property as selected, enabling further interaction or information display.
     *
     * @param {object} resale - The resale property that was clicked.
     */

    const handleDivClick = (resale) => {
        // console.log('Clicked:', resale);
        setSelectedProperty(true);
        setSelectedResale(resale);
    };

    const [bookmarked, setBookmarked] = useState({});
    const [sortOption, setSortOption] = useState(null);

    const [sortedData, setSortedData] = useState([]);

    /**
     * Handles sorting of properties based on the selected sort option.
     * Sorts properties by price or size in ascending or descending order.
     */

    useEffect(() => {
        let sorted = [...responseData];
        if (sortOption) {
            const [field, direction] = sortOption.split(' ');
            if (field === 'bookmark') {
                const bookmarkedProperties = sorted.filter(property => bookmarked[property.id]);
                const nonBookmarkedProperties = sorted.filter(property => !bookmarked[property.id]);
                sorted = [...bookmarkedProperties, ...nonBookmarkedProperties];
            } else {
                sorted.sort((a, b) => {
                    if (field === 'price' && direction === 'up') {
                        return a.resale_price - b.resale_price;
                    } else if (field === 'price' && direction === 'down') {
                        return b.resale_price - a.resale_price;
                    } else if (field === 'size' && direction === 'up') {
                        return a.floor_area_sqm - b.floor_area_sqm;
                    } else if (field === 'size' && direction === 'down') {
                        return b.floor_area_sqm - a.floor_area_sqm;
                    }
                    return 0; // Return 0 if no valid sorting condition is met
                });
            }
        }
        
        setSortedData(sorted);
    }, [responseData, sortOption, bookmarked]);
    


    const [frequentAddresses, setFrequentAddresses] = useState([]);
    const [userId, setUserId] = useState(null); // State for user ID

/**
     * Uses JWT to decode user data from localStorage and fetches frequent addresses.
     * It triggers on token existence and updates when user ID changes, suggesting a login or token refresh.
     */

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUserId(decodedToken.id); // Set user ID from decoded token
        }
        if (userId) {
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
                    console.log('response:', response);
                    return response.json();
                })
                .then(data => {
                    console.log('Frequent addresses:', data);
                    setFrequentAddresses(data);
                })
                .catch(error => {
                    console.error('Error fetching frequent addresses:', error);
                });
        }
    }, [userId]);


    //for Routing
    const [selectedFrequentAddress, setSelectedFrequentAddress] = useState(null);   //For user to select a frequent address to route to
    const [travelMode, setTravelMode] = useState("TRANSIT");    //Default to travel mode: public transport
    const [travelTime, setTravelTime] = useState({ TRANSIT: '', DRIVING: '', BICYCLING: '', WALKING: '' });


    return (
        <>
            <div className='relative z-[1000]'>
                {isAuthenticated ? <LoggedInNavbar formValues={formValues} /> : <LoggedOutNavbar formValues={formValues} />}
            </div>
            <Layout >
                <Layout>
                    <Content>
                        <Map
                            selectedResale1={selectedResale}
                            responseData={responseData}
                            selectedFrequentAddress={selectedFrequentAddress}
                            travelMode={travelMode}
                            setTravelTime={setTravelTime}
                            travelTime={travelTime}
                            amenityTypes={formValues.amenities}
                        />
                    </Content>
                </Layout>


                <SearchResultsBar bookmarked={bookmarked} setBookmarked={setBookmarked} setSortOption={setSortOption} sortedData={sortedData} handleDivClick={handleDivClick} userId={userId} selectedResale={selectedResale}/>

                {selectedProperty && 
                    <ExploreRightBar
                        isAuthenticated={isAuthenticated}
                        frequentAddresses={frequentAddresses}
                        setSelectedFrequentAddress={setSelectedFrequentAddress} 
                        selectedFrequentAddress={selectedFrequentAddress}
                        setTravelMode={setTravelMode}
                        travelMode={travelMode}
                        travelTime={travelTime}
                    />
                }
            </Layout>

        </>
    );
}

export default Explore