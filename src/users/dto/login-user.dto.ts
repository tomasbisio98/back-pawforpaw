import { IsNotEmpty, IsEmail, IsString, MinLength, MaxLength, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
    @ApiProperty({ description: 'User email address', example: 'user@example.com' })
    @IsNotEmpty({ message: 'Email is required!' })
    @IsEmail({}, { message: 'Email format is invalid!' })
    email: string;

    @ApiProperty({ description: 'User password', example: 'Hello123**' })
    @IsNotEmpty({ message: 'Password is required!' })
    @IsString({ message: 'Password must be a string!' })
    @MinLength(8, { message: 'Password must be at least 8 characters long!' })
    @MaxLength(20, { message: 'Password must not exceed 20 characters!' })
    @IsStrongPassword({
        minUppercase: 1,
        minLowercase: 1,
    })
    password: string;
}