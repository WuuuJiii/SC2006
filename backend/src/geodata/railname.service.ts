import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';

/**
 * Service responsible for retrieving rail names and processing GeoJSON data.
 */
@Injectable()
export class RailNameService {

    /**
     * Retrieve all rail names and process GeoJSON data.
     * @returns GeoJSON data containing rail names.
     */
    async getAllNames(): Promise<any> {
        //const directoryPath = path.join(__dirname, '..', '..', 'railgeojson');
        //const directoryPath = 'D:\\2006-SCSB-SCSB-T2\\backend\\railgeojson';
        const directoryPath = 'railgeojson';
        const filename = 'AmendmenttoMasterPlan2019RailStationNamelayer.geojson';
        const filePath = path.join(directoryPath, filename);
        console.log(`Processing file: ${filePath}`);

        //Store processed data to return
        const featureCollection = {
            type: "FeatureCollection",
            features: [],
        };

        let geoJsonString ;
        let geoJsonObject;

        try {
            geoJsonString = await fs.readFile(filePath, 'utf-8');
            geoJsonObject = JSON.parse(geoJsonString);
            //console.log(`Parsed GEOJSON: `, geoJsonObject);
            console.log(`Parsed GEOJSON: `);
        } catch (error) {
            console.error(`Error reading or parsing ${filename}:`, error);
            return featureCollection; // Return empty featureCollection in case of error
        }
        // Assuming the JSON file is a GeoJSON Feature or FeatureCollection,
        // adjust the logic here if your files might contain other JSON structures.
        if (geoJsonObject.type === "FeatureCollection") {
            featureCollection.features = featureCollection.features.concat(geoJsonObject.features);
        } else if (geoJsonObject.type === "Feature") {
            featureCollection.features.push(geoJsonObject);
        }

        return featureCollection;
    }
}