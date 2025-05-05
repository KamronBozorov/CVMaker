import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsBoolean, IsNumber } from "class-validator";

export class CreateEducationDto {
  @ApiProperty({ example: "Bakalavr Informatika" })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: "2018-09-01" })
  @IsString()
  @IsNotEmpty()
  start_time: string;

  @ApiProperty({ example: "2022-06-01" })
  @IsString()
  @IsNotEmpty()
  end_time: string;

  @ApiProperty({ example: "Talaba" })
  @IsString()
  position: string;

  @ApiProperty({ example: "Axborot Texnologiyalari Fakulteti" })
  @IsString()
  faculty: string;

  @ApiProperty({ example: "O‘qishga oid izohlar" })
  @IsString()
  description: string;

  @ApiProperty({ example: 7 })
  @IsNumber()
  relation_id: number;
}
