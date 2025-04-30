import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Role } from 'src/roles/models/role.model';

interface IUserCreationAttr {
  first_name: string;
  last_name: string;
  address: string;
  city: string;
  postcode: number;
  phone: string;
  email: string;
  hashed_password: string;
  about_text: string;
  role_id: number;
}

@Table({ tableName: 'users' })
export class User extends Model<User, IUserCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  @ApiProperty({
    example: 1,
    description: 'User ID si',
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
  })
  @ApiProperty({
    example: 'Kamron',
    description: 'User ismi',
  })
  declare first_name: string;

  @Column({
    type: DataType.STRING,
  })
  @ApiProperty({
    example: 'Bozorov',
    description: 'User familiyasi',
  })
  declare last_name: string;

  @Column({
    type: DataType.STRING,
  })
  @ApiProperty({
    example: 'Uzbekistan, Kashkadarya, Yangi Nishan',
    description: 'User addresi',
  })
  declare address: string;

  @Column({
    type: DataType.STRING,
  })
  @ApiProperty({
    example: 'Tashkent',
    description: 'Userni yashash shaxri',
  })
  declare city: string;

  @Column({
    type: DataType.INTEGER,
  })
  @ApiProperty({
    example: 1000000,
    description: 'User poskodi',
  })
  declare postcode: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  @ApiProperty({
    example: 'kamron@gmail.com',
    description: 'User gmaili',
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
  })
  @ApiProperty({
    example: 'kamron2006',
    description: 'User paroli',
  })
  declare hashed_password: string;

  @Column({
    type: DataType.STRING,
  })
  @ApiProperty({
    example: 'refreshtoken',
    description: 'User tokeni',
  })
  declare hashed_ref_token: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare is_active: boolean;

  @Column({
    type: DataType.STRING,
    defaultValue: false,
  })
  @ApiProperty({
    example: "Zo'r text",
    description: 'User texti',
  })
  declare about_text: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  @ApiProperty({
    example: '+998993181006',
    description: 'User telefon raqami',
  })
  declare phone: string;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
  })
  @ApiProperty({
    example: 1,
    description: 'User roli',
  })
  declare role_id: number;

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4(),
  })
  declare activation_link: string;

  @BelongsTo(() => Role)
  declare role: Role;
}
