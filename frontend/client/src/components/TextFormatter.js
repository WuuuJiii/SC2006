// TextFormatter.js
//Utility Class
export class TextFormatter {
    static toTitleCase(str) {
        return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
}
