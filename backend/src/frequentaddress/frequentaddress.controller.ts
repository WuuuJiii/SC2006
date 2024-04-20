import { Body, Controller, Delete, Get, Param, Post, UseGuards , Req } from "@nestjs/common";

import { AuthGuard } from "@nestjs/passport";
import { FrequentAddressService } from "./frequentaddress.service";


/**
 * Controller responsible for handling frequent address related requests
 */
@Controller('frequentaddress')
export class FrequentAddressController {
    constructor (private readonly FrequentAddressService: FrequentAddressService){}

    /**
     * Adds a frequent address for a user
     * @param userId User's email
     * @param location Location of frequent address
     * @returns Success message after adding a frequent address
     */
    @Post(':userId')
    @UseGuards(AuthGuard())
    async addFrequentAddress(@Param('userId') userId: string, @Body('location') location: string): Promise<string> {
        return this.FrequentAddressService.addFrequentAddress(userId, location);
    }

    /**
     * Deletes a frequent address for a user
     * @param userId User's email
     * @param location Location of frequent address
     * @returns Success message after deleting a frequent address
     */
    @Delete(':userId')
    @UseGuards(AuthGuard())
    async removeFrequentAddress(@Param('userId') userId: string, @Body('location') location: string): Promise<string> {
        return this.FrequentAddressService.removeFrequentAddress(userId, location);
    }

    /**
     * Retrieve frequent addresses of a user
     * @param userId User's email
     * @returns An array of frequent addresses 
     */
    @Get(':userId')
    @UseGuards(AuthGuard())
    async getFrequentAddress(@Param('userId') userId: string): Promise<string[]>{
        return this.FrequentAddressService.getFrequentAddress(userId);
    }
}
