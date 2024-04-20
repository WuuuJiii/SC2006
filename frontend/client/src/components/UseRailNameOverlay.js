/* global google */

import {useEffect} from "react";
import {IconBuilder} from "./IconBuilder";

// Function to build the icon
async function buildIconAsync(svgURL, locationSvgURL) {
    const iconBuilder = new IconBuilder();
    const options1 = {fill: "white", stroke: "white"};
    const options2 = {fill: "blue", stroke: "blue"};
    return await iconBuilder.mergeSVGs(locationSvgURL, svgURL, options1, options2);
}

// Function to initialize overlays
async function initializeOverlays(mapRef, railNames, builtIcon) {
    const uniqueNames = new Set();
    const overlays = [];

    // Dynamically import the RailNameOverlay module
    const {RailNameOverlay} = await import('./RailNameOverlay');

    railNames
        .filter(feature => {
            const isUnique = !uniqueNames.has(feature.properties.Name);
            if (isUnique) uniqueNames.add(feature.properties.Name);
            return isUnique;
        })
        .forEach(feature => {
            const position = {lat: feature.geometry.coordinates[0][1], lng: feature.geometry.coordinates[0][0]};
            const overlay = new RailNameOverlay(mapRef.current, position, feature.properties.Name, builtIcon);
            overlays.push(overlay);
        });

    return overlays;
}

// Main hook to use rail name overlays
export const useRailNameOverlays = (mapRef, railNames, svgURL, locationSvgURL, isLoaded) => {
    useEffect(() => {
        if (!mapRef.current || !railNames.length || !isLoaded) return;

        buildIconAsync(svgURL, locationSvgURL)
            .then(builtIcon => initializeOverlays(mapRef, railNames, builtIcon))
            .then(overlays => {
                // Adjust overlay visibility based on zoom level
                const zoomChangedListener = google.maps.event.addListener(mapRef.current, 'zoom_changed', () => {
                    const currentZoom = mapRef.current.getZoom();
                    overlays.forEach(overlay => overlay[currentZoom > 13 ? 'show' : 'hide']());
                });

                // Cleanup
                return () => {
                    google.maps.event.removeListener(zoomChangedListener);
                    overlays.forEach(overlay => overlay.setMap(null));
                };
            })
            .catch(error => console.error("Initialization failed:", error));
    }, [mapRef, railNames, svgURL, locationSvgURL, isLoaded]); // Dependencies for useEffect
};
