export const SVGUtils = {
    // Fetches SVG content from a URL
    async fetchSVG(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok.');
            return await response.text();
        } catch (error) {
            console.error('Error fetching SVG:', error);
            return null;
        }
    },
    // Parses an SVG string into a DOM element
    parseSVG(svgString) {
        const parser = new DOMParser();
        return parser.parseFromString(svgString, "image/svg+xml").documentElement;
    },
    // Recolors an SVG string, allowing separate colors for fill and stroke
    // Recolors an SVG string, targeting only specific elements for fill and stroke
    recolorSVG(svgContent, fillColor, strokeColor) {
        // Parse the SVG content into a DOM object
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgContent, "image/svg+xml");
        const svgRoot = svgDoc.documentElement;

        // Define the elements to target for recoloring
        const elementsToRecolor = ['path', 'circle', 'rect', 'polygon', 'polyline', 'line'];

        elementsToRecolor.forEach(tag => {
            svgRoot.querySelectorAll(tag).forEach(element => {
                if (fillColor) element.setAttribute('fill', fillColor);
                if (strokeColor) element.setAttribute('stroke', strokeColor);
            });
        });

        // Serialize the updated SVG DOM back into a string
        const serializer = new XMLSerializer();
        const updatedSVGContent = serializer.serializeToString(svgRoot);
        console.log("Recoloured SVGs");
        return updatedSVGContent;
    },

    // Adds a drop shadow to the SVG content
    addDropShadow(svgContent, options = {}) {
        // Parse the SVG content into a DOM object
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgContent, "image/svg+xml");
        const svgRoot = svgDoc.documentElement;

        // Generate a unique ID for the filter to prevent conflicts
        const filterId = `drop-shadow-${Date.now()}`;

        // Create the filter with feDropShadow or equivalent operations
        const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
        filter.setAttribute('id', filterId);
        filter.innerHTML = `
        <feGaussianBlur in="SourceAlpha" stdDeviation="${options.stdDeviation || 3}" />
        <feOffset dx="${options.dx || 2}" dy="${options.dy || 2}" result="offsetblur" />
        <feFlood flood-color="${options.color || 'black'}" />
        <feComposite in2="offsetblur" operator="in" />
        <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
        </feMerge>
    `;

        // Append the filter to the defs section or create it if it doesn't exist
        let defs = svgRoot.querySelector('defs');
        if (!defs) {
            defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            svgRoot.insertBefore(defs, svgRoot.firstChild);
        }
        defs.appendChild(filter);

        // Apply the filter to the root SVG element
        svgRoot.setAttribute('filter', `url(#${filterId})`);

        // Serialize the updated SVG DOM back into a string
        const serializer = new XMLSerializer();
        return serializer.serializeToString(svgRoot);
    },
    // Assuming SVGUtils includes a method to extract paths from SVG content
    extractPaths(svgContent) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgContent, "image/svg+xml");
        return Array.from(doc.querySelectorAll("path"));
    }
};
