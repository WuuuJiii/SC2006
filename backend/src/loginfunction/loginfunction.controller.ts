import { Body, Controller, Delete, Get, Param, Post, UseGuards , Req, Patch} from "@nestjs/common";

import { AuthGuard } from "@nestjs/passport";
import { LoginFunctionService } from "./loginfunction.service";
import { MinLength } from "class-validator";


/**
 * Controller responsible for handling login function related requests
 */
@Controller('loginfunction')
export class LoginFunctionController {
    constructor (private readonly LoginFunctionService: LoginFunctionService){}

    /**
     * Changes the name of a user
     * @param userId User's email
     * @param newName New name for the user
     * @returns Success message after changing the name
     */
    @Patch(':userId/changename')
    @UseGuards(AuthGuard())
    async changeName(@Param('userId') userId: string, @Body('newName') newName: string): Promise<string> {
        return this.LoginFunctionService.changeName(userId, newName);
    }

    /**
     * Changes the email address of a user
     * @param userId User's email
     * @param newEmail New email address for the user
     * @returns Success message after changing the email
     */
    @Patch(':userId/changeemail')
    @UseGuards(AuthGuard())
    async changeemail(@Param('userId') userId: string, @Body('newEmail') newEmail: string): Promise<string> {
        return this.LoginFunctionService.changeEmail(userId, newEmail);
    }

    /**
     * Changes the password of a user
     * @param userId User's email
     * @param oldPassword User's current password
     * @param newPassword New password
     * @param confirmPassword Confirmation of new password
     * @returns Success message after change password
     */
    @Patch(':userId/changepassword')
    @UseGuards(AuthGuard())
    async changepassword(@Param('userId') userId: string, @Body('oldPassword') oldPassword: string, @Body('newPassword') newPassword: string, @Body('confirmPassword') confirmPassword: string): Promise<string> {
        return this.LoginFunctionService.changePassword(userId, oldPassword, newPassword, confirmPassword);
    }
    

}