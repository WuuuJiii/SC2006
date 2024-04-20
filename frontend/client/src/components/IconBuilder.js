import {SVGUtils} from "./SVGUtils";

export class IconBuilder {
    // Merges two SVG strings into one, applying fill and stroke customizations
    async mergeSVGs(svgURL1, svgURL2, options1, options2) {
        try {
            // Fetch SVG content
            const svgContent1 = await SVGUtils.fetchSVG(svgURL1);
            const svgContent2 = await SVGUtils.fetchSVG(svgURL2);
            console.log("Fetched SVGs");
            // Apply color customizations
            const customizedSVG1 = SVGUtils.recolorSVG(svgContent1, options1.fill, options1.stroke);
            const customizedSVG2 = SVGUtils.recolorSVG(svgContent2, options2.fill, options2.stroke);

            // Parse the customized SVG content to DOM elements for further manipulation
            //const svgElement1 = SVGUtils.parseSVG(customizedSVG1);
            //const svgElement2 = SVGUtils.parseSVG(customizedSVG2);
            //console.log("Parsed SVGs");
            // Adjust zIndex through direct style manipulation or other means
            // Note: SVG doesn't directly support zIndex, so this might involve adjusting the order of appending
            // or using other techniques depending on the desired effect.
            // Serialize the SVG element to a string

            // Return the merged SVG content
            const combinedSVG = this.mergeSVGElements(customizedSVG1, customizedSVG2);
            return combinedSVG;
            const serializer = new XMLSerializer();
            return serializer.serializeToString(combinedSVG);
        } catch (error) {
            console.error("Failed to merge SVGS:", error);
            throw error;
        }
    }

    extractFirstPathFromSVG(svgString) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgString, "image/svg+xml");
        const path = doc.querySelector('path');
        return path ? path.outerHTML : null;
    }

    // Merges two SVG elements into one container SVG
    // Combines two SVG contents into one
    mergeSVGElements(svgContent1, svgContent2) {
        try {
            // Parse the SVG string into a DOM object
            const svgElement1 = SVGUtils.parseSVG(svgContent1);
            const svgElement2 = SVGUtils.parseSVG(svgContent2);
            const SvgString1 = this.extractFirstPathFromSVG(svgContent1);
            const SvgString2 = this.extractFirstPathFromSVG(svgContent2);
            //console.log(`SVGString1 ${SvgString1}`);
            // Combine SVG elements into one SVG, applying translations within <g> wrappers
            return `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" style="display: block;">
                <symbol id="svg1" viewBox="${svgElement1.getAttribute('viewBox')}">${SvgString1}</symbol>
                <symbol id="svg2" viewBox="${svgElement2.getAttribute('viewBox')}">${SvgString2}</symbol>
                 <use href="#svg1" x="0" y="0"/>
                <use href="#svg2" x="0" y="0" transform="scale(0.5) translate(250,160)"/>
            
            </svg>
        `;
        } catch (e) {
            console.log("Failed to merge", e);
        }
    }

    /*
    mergeSVGElements(svgContent1, svgContent2) {
        try {
            const transformedSvg1 = this.transformSVGToFitCommonViewBox(svgContent1);
            const transformedSvg2 = this.transformSVGToFitCommonViewBox(svgContent2);
            console.log(transformedSvg1);
            const SvgString1 = this.extractFirstPathFromSVG(transformedSvg1.transformedSVG);
            const SvgString2 = this.extractFirstPathFromSVG(transformedSvg2.transformedSVG);
            //console.log(`SVGString1 ${SvgString1}`);
            // Combine SVG elements into one SVG, applying translations within <g> wrappers
            return `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
                <g transform="translate(${transformedSvg1.translateX},${transformedSvg1.translateY})">${SvgString1}</g>
                <g transform="translate(${transformedSvg2.translateX},${transformedSvg2.translateY})">${SvgString2}</g>
            </svg>
        `;
        }catch(e){
            console.log("Failed to merge", e);
        }
    }*/
    /*
     transformSVGToFitCommonViewBox(svgString) {
        // Parse the SVG string into a DOM object
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgString, "image/svg+xml");
        const svgElement = svgDoc.documentElement;

        // Extract the original viewBox
         const originalViewBox = svgElement.getAttribute('viewBox') || "0 0 500 500";
        const [x, y, width, height] = originalViewBox.split(' ').map(Number);

        // Calculate the translation needed to position the SVG at the top left of the new viewBox
        const translateX = -x;
        const translateY = -Math.abs(y); // Ensure y is positive for upwards translation
        console.log(`x: ${translateX}, y: ${translateY}`)
        // Update the viewBox to the common size (preserving aspect ratio if desired)
        svgElement.setAttribute('viewBox', `0 0 500 500`);

        // Wrap all contents in a <g> element with a transform to translate the original content
        const gWrapper = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'g');
        gWrapper.setAttribute('transform', `translate(${translateX} ${translateY})`);

        // Move all children to the new <g> wrapper
        while (svgElement.firstChild) {
            gWrapper.appendChild(svgElement.firstChild);
        }

        // Append the wrapper back to the SVG
        svgElement.appendChild(gWrapper);

         // Serialize the updated SVG to a string format for further processing
         const serializer = new XMLSerializer();
         const transformedSVGString = serializer.serializeToString(svgDoc);

         // Return both the transformed SVG content and the translation values
         return {
             transformedSVG: transformedSVGString,
             translateX: translateX,
             translateY: translateY
         };
    }*/
}

// Assuming SVGUtils is imported and initialized somewhere
// const SVGUtils = ...

// Example usage:
/*
const iconBuilder = new IconBuilder(SVGUtils);
const svgURL1 = "path/to/your/firstSVG.svg";
const svgURL2 = "path/to/your/secondSVG.svg";
const options1 = { fill: "red", stroke: "blue" };
const options2 = { fill: "green", stroke: "yellow" };

// Use async/await or .then() to handle the asynchronous nature of mergeSVGs
const builtIcon = await iconBuilder.mergeSVGs(svgURL1, svgURL2, options1, options2);
*/
