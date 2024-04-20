import React, { useState, useEffect } from 'react';

import homeImage from "../images/home.png"
import LoggedOutNavbar from "../components/LoggedOutNavbar";
import LoggedInNavbar from "../components/LoggedInNavbar";
import { useNavigate } from 'react-router-dom';

/**
 * The Home component serves as the landing page and provides a brief overview and navigation for the site.
 * It fetches and displays a list of residences, and allows authenticated users to navigate to detailed views of these residences.
 *
 * @param {Object} props - Component props.
 * @param {boolean} props.isAuthenticated - Indicates whether the user is authenticated.
 * @returns {React.Component} - The Home component which displays the main features and links of the platform.
 */

function Home({isAuthenticated}) {
    const [residences, setResidences] = useState([]);

    /**
     * Fetches residence data from multiple endpoints and displays a selection on the homepage.
     * It runs on component mount and aggregates data from multiple fetched sources.
     */

    useEffect(() => {
        const fetchResidences = async () => {
            try {
                const urls = [
                    'http://localhost:3000/testData/660c2552e5604f67a4991029',
                    'http://localhost:3000/testData/660c2552e5604f67a4991012',
                    'http://localhost:3000/testData/660c2552e5604f67a499101d',
                    'http://localhost:3000/testData/660c2552e5604f67a499100d',
                    'http://localhost:3000/testData/660c2552e5604f67a499101a',
                    'http://localhost:3000/testData/660c2552e5604f67a4991034',
                ];

                const responses = await Promise.all(urls.map(url => fetch(url)));
                const responseData = await Promise.all(responses.map(response => response.json()));

                // Merge the data from all responses into a single array
                const mergedData = responseData.reduce((acc, data) => acc.concat(data), []);

                // Slice to get only the first 6 entries
                const firstSixResidences = mergedData.slice(0, 6);

                setResidences(firstSixResidences);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchResidences();
    }, []);

    const navigate = useNavigate();

    /**
     * Navigates to the property detail page of a selected residence.
     * It uses the 'react-router-dom' to navigate and passes the property ID via state.
     *
     * @param {string} propertyId - The ID of the property to show details for.
     */

    const handleShow = async (propertyId) => {
        try {
            // const response = await axios.get('http://localhost:3000/testData/testData/filter', { params: defaultInitialValues });
            navigate('/property',
                { state: { selectedId: propertyId } })
            // setShowLeftBar: false,
            //     // responseData: response.data, formValues: defaultInitialValues
            // }});
            console.log('Show property:', propertyId)
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {isAuthenticated ? <LoggedInNavbar isAuthenticated={isAuthenticated}/> : <LoggedOutNavbar />}
            <div className="flex flex-col items-center">
                <div className="relative pt-10 pb-10 pl-5 pr-5">
                    <img src={homeImage} className="w-full" alt="Home" />

                    <div className="absolute
                            top-[calc(50%+30px)] left-1/2
                            transform -translate-x-1/2 -translate-y-1/2 
                            text-center text-white 
                            bg-black bg-opacity-30 p-5 rounded z-10">
                        <h2 className="text-3xl font-bold pb-2">Discover through Amenities</h2>
                        <p className="text-base">Your dream home location should cater to your lifestyle. Find homes near Gyms, Schools, Shopping Centres, new MRT lines, and more...</p>
                    </div>
                </div>

                <div className="w-full p-4">
                    <h2 className="font-bold text-3xl text-center mb-6">Explore Residences</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {residences.map((resale, index) => (
                            <div key={resale._id}
                                // className= "w-[30%], p-[20px], shadow-md, m-[10px]"
                                style={{ width: '30%', padding: '20px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', margin: '10px' }}>
                                <div className="header">
                                    <div className="residence-name">{resale.town}</div>
                                    <div className="price-range">${resale.resale_price.toLocaleString()}</div>
                                </div>
                                <ul className="residence-details">
                                    <li>Type: {resale.flat_type}</li>
                                    <li>Street:  {resale.street_name}</li>
                                    <li>Block number: {resale.block}</li>
                                    <li>Floor area:  {resale.floor_area_sqm} sqm</li>
                                    <button
                                        onClick={() => handleShow(resale._id)}
                                        className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded mr-2"
                                    >
                                        Show
                                    </button>
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home