import * as mongoose from 'mongoose';

/**
 * Interface representing a resale property document in the database.
 * Defines the structure of a resale property including its attributes.
 */
export interface Resale extends mongoose.Document{
//export interface Resale{
    id: String;
    month: string;
    town: string;
    flat_type: string;
    block_no: number;
    street_name: string;
    storey_range: string;
    floor_area_sqm: number;
    flat_model: string;
    lease_commense_date: number;
    remaining_lease: string;
    resale_price: number;
}

/**
 * Mongoose schema definition for the Resale model.
 * Defines the structure and data types of the Resale document.
 */
export const ResaleSchema = new mongoose.Schema({
    month: {type: String, required: true},
    town: {type: String, required: true},
    flat_type: {type: String, required: true},
    block_no: {type: Number, required: true},
    street_name: {type: String, required: true},
    storey_range: {type: String, required: true},
    floor_area_sqm: {type: Number, required: true},
    flat_model: {type: String, required: true},
    lease_commense_date: {type: Number, required: true},
    remaining_lease: {type: String, required: true},
    resale_price: {type: Number, required: true},
});