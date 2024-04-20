import {Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';
import { User } from "src/auth/user.schema";


/**
 * Service responsible for bookmark related logic and operations
 */
@Injectable()
export class BookmarkService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
    ) {}
    /**
     * Adds a bookmark for a user
     * @param userId User's email
     * @param propertyId Property ID
     * @returns Success message after adding a bookmark
     */
    async addBookmark(userId: string, propertyId: string): Promise<string>{
        await this.userModel.findByIdAndUpdate(userId, {$addToSet: {bookmarks: propertyId}});
        return 'Bookmark saved successfully'
        
    }
    
    /**
     * Removes a bookmark for a user
     * @param userId User's email
     * @param propertyId Property ID
     * @returns Success message after removing a bookmark
     */
    async removeBookmark(userId: string, propertyId: string): Promise<string>{
        const bookmarks = (await this.userModel.findById(userId)).bookmarks;
        if(bookmarks.length == 0){
            throw new NotFoundException ('You have not bookmarked any properties');
        }
        await this.userModel.findByIdAndUpdate(userId, {$pull: {bookmarks: propertyId}});
        return 'Bookmark removed successfully'
    }
    
    /**
     * Retrieve bookmarks of a user
     * @param userId User's email
     * @returns An array of bookmarks representing property IDs
     */
    async getBookmark(userId: string): Promise<string[]>{
        const bookmarks = (await this.userModel.findById(userId)).bookmarks;
        if(bookmarks.length == 0){
            throw new NotFoundException ('You have not bookmarked any properties');
        }
        else
            return bookmarks
        }
}
