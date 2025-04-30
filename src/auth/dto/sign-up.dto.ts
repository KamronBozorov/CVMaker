import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    example: 'kamron@gmail.com',
    description: 'Foydalanuvchi email manzili',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'kamron123',
    description: 'Parol kamida 6 belgidan iborat bo‘lishi kerak',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: 'kamron123',
    description: 'Parolni tasdiqlash (password bilan bir xil bo‘lishi kerak)',
  })
  @IsNotEmpty()
  @IsString()
  confirm_password: string;

  @ApiProperty({
    example: '+998991234567',
    description: 'Foydalanuvchi telefon raqami',
  })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({
    example: 'Kamron',
    description: 'Foydalanuvchi ismi',
    required: false,
  })
  @IsString()
  @IsOptional()
  first_name: string;

  @ApiProperty({
    example: 'Bozorov',
    description: 'Foydalanuvchi familiyasi',
    required: false,
  })
  @IsString()
  @IsOptional()
  last_name: string;

  @ApiProperty({
    example: 'Toshkent shahar, Chilonzor tumani',
    description: 'Yashash manzili',
    required: false,
  })
  @IsOptional()
  @IsString()
  address: string;

  @ApiProperty({
    example: 'Toshkent',
    description: 'Shahar',
    required: false,
  })
  @IsString()
  @IsOptional()
  city: string;

  @ApiProperty({
    example: 'O‘zim haqimda qisqacha',
    description: 'Foydalanuvchi haqida matn',
    required: false,
  })
  @IsString()
  @IsOptional()
  about_text: string;

  @ApiProperty({
    example: 100100,
    description: 'Pochta indeksi',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  postcode: number;

  @ApiProperty({
    example: 1,
    description: 'Role ID — foydalanuvchi roli',
  })
  @IsNumber()
  @IsNotEmpty()
  role_id: number;
}
