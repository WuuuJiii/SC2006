import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';


/**
 * Service responsible for handling geodata-related operations.
 */
@Injectable()
export class GeodataService {
    
    /**
     * Combines GeoJSON files into a single FeatureCollection.
     * @returns A promise that resolves to the combined GeoJSON data.
     */
    async combineGeoJsonFiles(): Promise<any> {
        //const directoryPath = path.join(__dirname, '..', '..', 'railgeojson');
        //const directoryPath = 'D:\\2006-SCSB-SCSB-T2\\backend\\railgeojson\\railobjects';
        
        //fixed directory path
        const path = require('path');
        const directoryPath = path.join(__dirname, '..', '..', 'railgeojson', 'railobjects');
        
        const files = await fs.readdir(directoryPath);
        const featureCollection = {
          type: "FeatureCollection",
          features: [],
        };

        for (let filename of files) {
            // Filter out files that are not JSON files
            if (!filename.endsWith('.geojson')) {
                console.log(`Skipping non-GEOJSON file: ${filename}`);
                continue;
            }

            const filePath = path.join(directoryPath, filename);
            console.log(`Processing file: ${filePath}`);

            let geoJsonString ;
            let geoJsonObject;

            try {
              geoJsonString = await fs.readFile(filePath, 'utf-8');
              geoJsonObject = JSON.parse(geoJsonString);
              // console.log(`Parsed GEOJSON: `, geoJsonObject);
              console.log(`Parsed GEOJSON: `);
            } catch (error) {
              console.error(`Error reading or parsing ${filename}:`, error);
              continue; // Skip this file and move to the next one
            }
            // Assuming the JSON file is a GeoJSON Feature or FeatureCollection,
            // adjust the logic here if your files might contain other JSON structures.
            if (geoJsonObject.type === "FeatureCollection") {
              featureCollection.features = featureCollection.features.concat(geoJsonObject.features);
            } else if (geoJsonObject.type === "Feature") {
              featureCollection.features.push(geoJsonObject);
            }
            // Optionally, you can add an else block to handle non-GeoJSON files,
            // depending on whether you expect other types of JSON structures
        }
        return featureCollection;
    }
}