import * as mongoose from 'mongoose';

/**
 * Geodata Model and Schema Definitions
 * This file defines the Mongoose model and schemas for storing and querying geospatial data.
 * It includes schemas for defining geometry, features, and feature collections.
 */

// Define a schema for GeoJSON Geometry objects
const GeometrySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: [
      'Point',
      'LineString',
      'Polygon',
      'MultiPoint',
      'MultiLineString',
      'MultiPolygon',
    ],
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
const GeodataModel = mongoose.model('geodata', FeatureCollectionSchema);
export { GeodataModel, FeatureCollectionSchema };
