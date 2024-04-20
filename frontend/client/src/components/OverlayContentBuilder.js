// OverlayContentBuilder.js
import {SVGUtils} from './SVGUtils';
import {TextFormatter} from './TextFormatter';

export class OverlayContentBuilder {
    constructor(svgContent) {
        this.svgContent = svgContent;
        //this.iconStrokeColour = iconStrokeColour;
        //this.iconFillColour = iconFillColour;
    }

    async buildContent(text, shadowOptions) {
        try {
            const titleCasedText = TextFormatter.toTitleCase(text);
            //const coloredSVG = SVGUtils.recolorSVG(svgContent, this.iconStrokeColour, this.iconFillColour);
            // Adding the drop shadow to the SVG
            const svgWithShadow = SVGUtils.addDropShadow(this.svgContent, shadowOptions);
            console.log(` Merged SVG to build: ${this.svgContent}`);
            return `<span style="vertical-align: middle; margin-right: 3px; height: 40px; width: 40px; z-index: inherit">${svgWithShadow}</span>${titleCasedText}`;

        } catch (e) {
            console.log("Failed to build content:", e);
        }
    }
}
