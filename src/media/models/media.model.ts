import { Table, Model, Column, DataType } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

interface IMediaCreationAttr {
  media_name: string;
  table_name: string;
  table_id: number;
}

@Table({ tableName: "media" })
export class Media extends Model<Media, IMediaCreationAttr> {
  @ApiProperty({ example: 1, description: "Unikal ID" })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({ example: "rasm.jpg", description: "Media fayl nomi" })
  @Column({ type: DataType.STRING(255), allowNull: false })
  declare media_name: string;

  @ApiProperty({ example: "users", description: "Qaysi jadvalga tegishli" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare table_name: string;

  @ApiProperty({ example: true, description: "Faollik holati" })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare is_active: boolean;

  @ApiProperty({ example: 42, description: "Tegishli jadvaldagi yozuv IDsi" })
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare table_id: number;
}
