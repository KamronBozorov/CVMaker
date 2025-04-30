import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { Column } from 'sequelize-typescript';

export class CreateUserDto {
  @ApiProperty({
    example: 'kamron@gmail.com',
    description: 'User gmaili',
  })
  email: string;

  @ApiProperty({
    example: 'kamron2006',
    description: 'User paroli',
  })
  password: string;

  @ApiProperty({
    example: 'kamron2006',
    description: 'User parolini qayta kiritadi',
  })
  confirm_password: string;

  @ApiProperty({
    example: '+998993181006',
    description: 'User telefon raqami',
  })
  phone: string;

  @ApiProperty({
    example: 'Kamron',
    description: 'User ismi',
  })
  first_name: string;

  @ApiProperty({
    example: 'Bozorov',
    description: 'User familiyasi',
  })
  last_name: string;

  @ApiProperty({
    example: 'Uzbekistan, Kashkadarya, Yangi Nishan',
    description: 'User addresi',
  })
  address: string;

  @ApiProperty({
    example: 'Tashkent',
    description: 'Userni yashash shaxri',
  })
  city: string;

  @ApiProperty({
    example: 1000000,
    description: 'User poskodi',
  })
  postcode: number;

  @ApiProperty({
    example: "Zo'r text",
    description: 'User texti',
  })
  about_text: string;

  @ApiProperty({
    example: 1,
    description: 'User roli',
  })
  role_id: number;
}
