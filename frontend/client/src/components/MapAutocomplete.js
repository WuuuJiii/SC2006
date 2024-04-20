import React, { useRef, useState } from 'react';
import { GoogleMap, Autocomplete, useJsApiLoader } from '@react-google-maps/api';

const mapContainerStyle = {
    width: '100%',
    height: '70vh'
};

const center = {
    lat: 1.350270,
    lng: 103.8198
};

/**
 * Map display when adding new frequently visited addresses, using @react-google-maps/api
 * 
 * @param {*} setSelectedPlace - the frequently visited address selected by the user to be saved 
 * @returns 
 */
function MapAutocomplete({setSelectedPlace}) {
    
    const [markers, setMarkers] = useState([]);
    const autocompleteRef = useRef(null);
    const mapRef = useRef(null);
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDLCMSp9E0LVe8-nZbxQwORyFHLULTrIXA",
        libraries: ['places']
    });

    /**
     * Handler for the Map whenever the user searches for a different location
     */
    const onPlaceChanged = () => {
        const place = autocompleteRef.current.getPlace();
        if (place && place.geometry && place.geometry.location && mapRef.current) {
            setSelectedPlace(place.formatted_address);

            // Remove previous markers
            markers.forEach(marker => marker.setMap(null));

            //Add new marker for searched location
            const marker = new window.google.maps.Marker({
                position: place.geometry.location,
                map: mapRef.current,
                title: place.name
            });

            mapRef.current.panTo(place.geometry.location);
            mapRef.current.setZoom(15);

            // Update markers state with the new marker
            setMarkers([marker]);

        } else {
            console.log('Autocomplete is not loaded yet!');
        }
    };

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={11} // Adjusted zoom for better visibility
            center={center}
            onLoad={mapInstance => { mapRef.current = mapInstance; }} // Correct usage of onLoad
            options={{ mapId: "42923ec279983523" }}
        >
            <Autocomplete
                onLoad={(autocomplete) => autocompleteRef.current = autocomplete}
                onPlaceChanged={() => onPlaceChanged()}
            >
                <input className="w-[40%] h-[9%]
                                absolute left-[30%] top-[3%]
                                border border-radius-[3px]
                                "
                    type="text"
                    placeholder="Enter a frequently visited location"
                    style={{
                        border: `1px solid transparent`,
                        padding: `0 12px`,
                        borderRadius: `3px`,
                        boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                        fontSize: `14px`,
                        outline: `none`,
                        textOverflow: `ellipses`,
                    }}
                />
            </Autocomplete>
        </GoogleMap>
    ) : <></>;
}

export default MapAutocomplete;