import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { User } from 'src/users/models/user.model';

interface IRoleCreationAttr {
  name: string;
}
@Table({ tableName: 'roles' })
export class Role extends Model<Role, IRoleCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
  })
  declare name: string;

  @Column({
    defaultValue: false,
    type: DataType.BOOLEAN,
  })
  declare is_active: boolean;

  @HasMany(() => User)
  declare users: User[];
}
