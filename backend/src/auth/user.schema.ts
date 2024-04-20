import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


/**
 * User Schema and Model
 * Defines the schema and model for user documents in the database
 */
@Schema({
    timestamps: true,
})

export class User extends Document {

    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    security: string;

    @Prop({ type: [String], default: [ ]})
    bookmarks: string [];

    @Prop({ type: [String], default: [ ]})
    frequentaddress: string [];

}


export const UserSchema = SchemaFactory.createForClass(User);
