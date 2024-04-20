import { Body, Controller, Post, Patch, Request, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { Sign } from 'crypto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

/**
 * Controller for handling authentication and user account management.
 */
@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService){}

    //CREATE data
    /**
     * Registers a new user with the provided credentials.
     * @param signUpDto The signup data transfer object containing user registration information.
     * @returns A promise resolving to an object containing the JWT token.
     */
    @Post('/signup')
    signUp(@Body() SignUpDto: SignUpDto): Promise <{token: string}> {
        return this.authService.signUp(SignUpDto);
    }

    /**
     * Authenticates a user with the provided credentials.
     * @param loginDto The login data transfer object containing user login information.
     * @returns A promise resolving to an object containing the JWT token.
     */
    @Post('/login')
    login(@Body() LoginDto: LoginDto): Promise <{token: string}> {
        return this.authService.login(LoginDto);
    }

    /**
     * Resets the password for the user identified by the given email, if the provided answer matches the security question.
     * @param email The email of the user requesting a password reset.
     * @param answer The answer to the user's security question.
     * @returns A promise resolving to a string indicating the result of the operation.
     */
    @Patch('/forgetpassword')
    async forgetPassword(@Body('email') email: string, @Body('securityAnswer') securityAnswer: string): Promise<string>{
        return this.authService.forgetPassword(email, securityAnswer)
    }

    //MODIFY data
    /**
     * Updates the email address for the authenticated user.
     * @param req The request object, containing the authenticated user's ID.
     * @param newEmail The new email address to be set for the user.
     * @returns A promise resolving to the updated user.
     */
    @Patch('/update-email')
    @UseGuards(AuthGuard('jwt')) //Authenticate access to user data
    async updateEmail(@Request() req, @Body('email') newEmail: string) {
        console.log(`Updating email for user ${req.user.id} to ${newEmail}`);
        return this.authService.updateEmail(req.user.id, newEmail);
    }

    /**
     * Updates the password for the authenticated user.
     * @param req The request object, containing the authenticated user's ID.
     * @param updatePasswordDto The DTO containing the current and new password.
     * @returns A promise resolving to the updated user.
     */
    @UseGuards(AuthGuard('jwt')) //Authenticate access to user data
    @Patch('/update-password')
    async updatePassword(@Request() req, @Body() updatePasswordDto: { currentPassword: string, newPassword: string }) {
        return this.authService.updatePassword(req.user.id, updatePasswordDto.currentPassword, updatePasswordDto.newPassword);
    }

    /**
     * Updates the name for the authenticated user.
     * @param req The request object, containing the authenticated user's ID.
     * @param newName The new name to be set for the user.
     * @returns A promise resolving to the updated user.
     */
    @Patch('/update-name')
    @UseGuards(AuthGuard()) //Authenticate access to user data
    async updateName(@Request() req, @Body('name') newName: string) {
        return this.authService.updateName(req.user.id, newName);
    }

    //GET data
    /**
     * Retrieves the account information for the authenticated user.
     * @param req The request object, containing the authenticated user's ID.
     * @returns A promise resolving to an object containing the user's name and email.
     */
    @Get(':userId')
    @UseGuards(AuthGuard())
    async getAccount(@Request() req) {
        return this.authService.getAccount(req.user.id);
    }
}
