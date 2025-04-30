import { ApiProperty, PartialType } from '@nestjs/swagger';
import { SignUpDto } from './sign-up.dto';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'kamron@gmail.com',
    description: 'User emaili',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'kamron123',
    description: 'User paroli',
  })
  password: string;
}
