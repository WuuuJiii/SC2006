import * as mongoose from 'mongoose';

/**
 * Test Data Interface
 * Represents the structure of test data documents.
 */
export interface TestData extends mongoose.Document {
  id: string;
  month: string;
  town: string;
  flat_type: string;
  block: string;
  street_name: string;
  storey_range: string;
  floor_area_sqm: number;
  flat_model: string;
  lease_commense_date: number;
  remaining_lease: string;
  resale_price: number;
  Latitude: number;
  Longitude: number;
}

/**
 * Test Data Schema
 * Defines the schema for the test data collection.
 */
export const TestDataScehma = new mongoose.Schema({
  month: {type: String, required: true},
  town: {type: String, required: true},
  flat_type: {type: String, required: true},
  block: {type: String, required: true},
  street_name: {type: String, required: true},
  storey_range: {type: String, required: true},
  floor_area_sqm: {type: Number, required: true},
  flat_model: {type: String, required: true},
  lease_commense_date: {type: Number, required: true},
  remaining_lease: {type: String, required: true},
  resale_price: {type: Number, required: true},
  Latitude: {type: Number, required: true},
  Longitude: {type: Number, required: true},
});
