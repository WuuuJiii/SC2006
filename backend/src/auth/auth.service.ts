import {BadRequestException, ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { User } from './user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

/**
 * Service responsible for authentication related logic
 * It provides methods for user sign up, login, password management and account information retrieval
 */
@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService
    ) {}
    
    /**
     * Registers a new user 
     * @param signUpDto DTO containing user registration data
     * @returns Object containing a JWT token
     * @throws ConflictsException if email is already in use
     */
    async signUp(signUpDto: SignUpDto): Promise<{token: string}> {
        const {name, email, password, security} = signUpDto;
        const existingemail = await this.userModel.findOne({email});
        if(existingemail){
            throw new ConflictException('This email has already been used');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.userModel.create({
            name,
            email,
            password: hashedPassword,
            security
        });

        const token = this.jwtService.sign({id: user._id});
        return {token};
    }

    /**
     * Logs a user in 
     * @param loginDto DTO containing a user login data
     * @returns Object containing a JWT token
     * @throws UnathorizedException if email of password is invalid
     */
    async login(loginDto: LoginDto): Promise<{token: string}>{
        const {email, password} = loginDto;
        const user = await this.userModel.findOne({email});
        if(!user){
            throw new UnauthorizedException('Invalid email');
        }
        const passwordMatched = await bcrypt.compare(password, user.password);
        if(!passwordMatched){
            throw new UnauthorizedException('Invalid password');
        }
        
        const token = this.jwtService.sign({id: user._id});
        return {token};
    }

    /**
     * Reset user password if user forgets password
     * @param email User's email
     * @param answer User's security answer
     * @returns Success message after resetting password
     * @throws UnathorizedException if email or security answer is invalid
     */
    async forgetPassword(email: string, securityAnswer: string): Promise<string>{
        const user = await this.userModel.findOne({email});
        if(!user){
            throw new UnauthorizedException('Invalid email address');
        }
        console.log(`Resetting password: compare security answer ${user.security} to ${securityAnswer}`);

        if(user.security!=securityAnswer){
            throw new UnauthorizedException('Wrong Answer to Security Question');
        }
        else{
            const defaultPassword = '123456';
            const hashedPassword = await bcrypt.hash(defaultPassword, 10)
            user.password = hashedPassword
            await user.save()
            return 'Your password has been changed to 123456. Please change your password after you logged in'
        }
    }

    /**
     * Updates email address of a user
     * @param userId User's email
     * @param newEmail New email address
     * @returns Object containing a JWT token
     * @throws UnauthorizedException if user not found or no change in email
     * @throws ConflictException if new email is already in use 
     */
    async updateEmail(userId: string, newEmail: string): Promise<{ token: string }> {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        if (newEmail === user.email) {
            throw new UnauthorizedException('No change in email');
        }

        // Ensure valid email
        // You can use a simple regex for email validation
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(newEmail)) {
            throw new BadRequestException('Invalid email');
        }

        try {
            const existingEmail = await this.userModel.findOne({ email: newEmail });
            if (existingEmail) {
                throw new ConflictException('This email is already in use');
            }

            user.email = newEmail;
            await user.save();
            const token = this.jwtService.sign({ id: user._id });
            return { token };
        } catch (error) {
            throw new ConflictException('This email is already in use');
        }
    }

    /**
     * Updates the password of a user
     * @param userId User's email
     * @param currentPassword User's current password
     * @param newPassword new password
     * @returns Success message after updating the password
     * @throws UnathorizedException if user not found, current password is incorrect or new password is same as old one
     */
    async updatePassword(userId: string, currentPassword: string, newPassword: string): Promise<string> {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const passwordMatched = await bcrypt.compare(currentPassword, user.password);
        if (!passwordMatched) {
            throw new UnauthorizedException('Current password is incorrect');
        }

        if (currentPassword === newPassword) {
            throw new UnauthorizedException('New password cannot be the same as the old password');
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        return 'Your password has been successfully changed';
    }

    /**
     * Updates the name of a user
     * @param userId User's email
     * @param newName New name
     * @returns Updated user object
     * @throws UnathorizedException if user not found or new name is same as the old name
     */
    async updateName(userId: string, newName: string): Promise<User> {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        if (user.name === newName) {
            throw new UnauthorizedException('Please enter a new name');
        }

        user.name = newName;
        await user.save();
        return user;
    }
    
    /**
     * Retrieves account details of a user.
     * @param userId - User's ID.
     * @returns Object containing user's name and email.
     * @throws UnauthorizedException if user not found.
     */
    async getAccount(userId: string): Promise<{name: string, email: string}> {
        const user = await this.userModel.findById(userId).select('name email -_id');
        if (!user) {
            throw new UnauthorizedException('User not found');
        }
        return { name: user.name, email: user.email };
    }

}
