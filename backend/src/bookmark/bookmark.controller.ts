import { Body, Controller, Delete, Get, Param, Post, UseGuards , Req } from "@nestjs/common";
import { BookmarkService } from './bookmark.service';
import { AuthGuard } from "@nestjs/passport";


/**
 * Controller for handling bookmark related request
 */
@Controller('bookmark')
export class BookmarkController {
    constructor (private readonly BookmarkService: BookmarkService){}

    /**
     * Adds a bookmark for a user
     * @param userId User's email
     * @param propertyId Property ID
     * @returns Success message after adding bookmark
     */
    @Post(':userId/:propertyId')
    @UseGuards(AuthGuard())
    async addBookmark(@Param('userId') userId: string, @Param('propertyId') propertyId: string): Promise<string> {
        return this.BookmarkService.addBookmark(userId, propertyId);
    }

    /**
     * Removes a bookmark for a user
     * @param userId User's email
     * @param propertyId Property ID
     * @returns Success message after removing bookmark
     */
    @Delete(':userId/:propertyId')
    @UseGuards(AuthGuard())
    async removeBookmark(@Param('userId') userId: string, @Param('propertyId') propertyId: string): Promise<string> {
        return this.BookmarkService.removeBookmark(userId, propertyId);
    }

    /**
     * Retrieve bookmarks of a user
     * @param userId User's email
     * @returns An array of bookmarks representing property IDs
     */
    @Get(':userId')
    @UseGuards(AuthGuard())
    async getBookmark(@Param('userId') userId: string): Promise<string[]>{
        return this.BookmarkService.getBookmark(userId);
    }
}
