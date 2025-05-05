import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsBoolean, IsNumber, IsNotEmpty } from "class-validator";

export class CreateMediaDto {
  @ApiProperty({ example: "users", description: "Qaysi jadvalga tegishli" })
  @IsString()
  @IsNotEmpty()
  table_name: string;

  @ApiProperty({ example: 42, description: "Tegishli jadvaldagi yozuv IDsi" })
  @IsNumber()
  table_id: number;
}
