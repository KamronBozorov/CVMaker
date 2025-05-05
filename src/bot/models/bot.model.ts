import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IBotCreationAttr {
  user_id: number;
  first_name: string;
  last_name: string;
  username: string;
}

@Table({ tableName: "bots" })
export class Bot extends Model<Bot, IBotCreationAttr> {
  @Column({
    type: DataType.BIGINT,
    unique: true,
    primaryKey: true,
  })
  declare user_id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  declare username: string;

  @Column({
    type: DataType.STRING,
  })
  declare first_name: string;

  @Column({
    type: DataType.STRING,
  })
  declare last_name: string;

  @Column({
    type: DataType.STRING(15),
  })
  declare phone_number: string;

  @Column({
    type: DataType.STRING(15),
  })
  declare location: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  declare status: boolean;
}
