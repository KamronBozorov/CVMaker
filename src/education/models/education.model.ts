export interface IEduCreationAttr {
  title: string;
  start_time: string;
  end_time: string;
  position: string;
  faculty: string;
  description: string;
  relation_id: number;
}

import { Table, Column, Model, DataType } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

@Table({ tableName: "educations" })
export class Education extends Model<Education, IEduCreationAttr> {
  @ApiProperty({ example: 1, description: "Unikal ID" })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({
    example: "Bakalavr Informatika",
    description: "Ta'lim yo'nalishi nomi",
  })
  @Column({ type: DataType.STRING, allowNull: false })
  declare title: string;

  @ApiProperty({ example: "2018-09-01", description: "Boshlanish sanasi" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare start_time: string;

  @ApiProperty({ example: "2022-06-01", description: "Tugash sanasi" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare end_time: string;

  @ApiProperty({ example: "Talaba", description: "Lavozimi yoki maqomi" })
  @Column({ type: DataType.STRING })
  declare position: string;

  @ApiProperty({
    example: "Axborot Texnologiyalari Fakulteti",
    description: "Fakultet nomi",
  })
  @Column({ type: DataType.STRING })
  declare faculty: string;

  @ApiProperty({
    example: "O‘qishga oid izohlar",
    description: "Qo‘shimcha tavsif",
  })
  @Column({ type: DataType.STRING })
  declare description: string;

  @ApiProperty({
    example: 7,
    description: "Tegishli obyekt IDsi (masalan: user_id)",
  })
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare relation_id: number;

  @ApiProperty({ example: true, description: "Faollik holati" })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare is_active: boolean;
}
