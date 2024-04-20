import {Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { User } from "src/auth/user.schema";


/**
 * Service responsible for handling frequent address related logic and operations
 */
@Injectable()
export class FrequentAddressService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
    ) {}
    
    /**
     * Adds a frequent address for a user
     * @param userId User's email
     * @param location Location of frequent address
     * @returns Success message after adding a frequent address
     */
    async addFrequentAddress(userId: string, location: string): Promise<string>{
        await this.userModel.findByIdAndUpdate(userId, {$addToSet: {frequentaddress: location}});
        return 'Frequent address saved successfully';
    }

    /**
     * Deletes a frequent address for a user
     * @param userId User's email
     * @param location Location of frequent address
     * @returns Success message after deleting a frequent address
     */
    async removeFrequentAddress(userId: string, location: string): Promise<string>{
        const frequentaddress = (await this.userModel.findById(userId)).frequentaddress;
        if(frequentaddress.length == 0){
            throw new NotFoundException ('You have not added any frequent addresses');
        }
        await this.userModel.findByIdAndUpdate(userId, {$pull: {frequentaddress: location}});
        return "Frequent address removed successfully";
    }

    /**
     * Retrieve frequent addresses of a user
     * @param userId User's email
     * @returns An array of frequent addresses 
     */
    async getFrequentAddress(userId: string): Promise<string[]>{
        const frequentaddress = (await this.userModel.findById(userId)).frequentaddress;
        if(frequentaddress.length == 0){
            throw new NotFoundException ('You have not added any frequent addresses');
        }
        else
            return frequentaddress;
        }
}