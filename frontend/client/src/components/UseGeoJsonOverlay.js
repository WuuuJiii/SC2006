import {useEffect} from 'react';

export const useGeoJsonOverlay = (mapRef, mrt) => {
    useEffect(() => {
        if (mapRef.current && mrt) {
            const zIndex = 0;

            // Clear existing GeoJson to prevent duplicates if the effect reruns
            mapRef.current.data.forEach(feature => {
                mapRef.current.data.remove(feature);
            });

            // Add the GeoJSON data to the map
            mapRef.current.data.addGeoJson(mrt);

            // Set the style, including zIndex, for the features
            mapRef.current.data.setStyle((feature) => {
                return {
                    // Other styles can be set here as needed
                    zIndex: 0,
                    strokeWeight: 2,
                };
            });
        }
    }, [mapRef, mrt]);
};
