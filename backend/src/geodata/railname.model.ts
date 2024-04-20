import * as mongoose from 'mongoose';

/**
 * Mongoose model for storing rail name data in GeoJSON format.
 */

// Define a schema for GeoJSON Geometry objects
const GeometrySchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point', 'LineString', 'Polygon', 'MultiPoint', 'MultiLineString', 'MultiPolygon'],
        required: true,
    },
    coordinates: {
        type: [[Number]], // This will vary based on the type; adjust accordingly
        required: true,
    },
});

// Define a schema for GeoJSON Feature objects
const FeatureSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Feature'],
        required: true,
    },
    properties: mongoose.Schema.Types.Mixed, // This can be any structure you need
    geometry: GeometrySchema,
});

// Define a schema for GeoJSON FeatureCollection objects
const FeatureCollectionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['FeatureCollection'],
        required: true,
    },
    features: [FeatureSchema],
});

// Create a Mongoose model
const RailNameModel = mongoose.model('railname', FeatureCollectionSchema);
export { RailNameModel, FeatureCollectionSchema };
