import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async create(createUserDto: CreateUserDto) {
    const { password, confirm_password } = createUserDto;

    if (password !== confirm_password)
      throw new BadRequestException('Passwords not matched');

    const hashed_password = await bcrypt.hash(password, 10);

    return this.userModel.create({ ...createUserDto, hashed_password });
  }

  findAll() {
    return this.userModel.findAll({ include: { all: true } });
  }

  findOne(id: number) {
    return this.userModel.findByPk(id, { include: { all: true } });
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ include: { all: true }, where: { email } });
  }

  findByPhone(phone: string) {
    return this.userModel.findOne({ include: { all: true }, where: { phone } });
  }

  findByLink(link: string) {
    return this.userModel.findOne({
      include: { all: true },
      where: { activation_link: link },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userModel.update(updateUserDto, { where: { id } });
  }

  remove(id: number) {
    return this.userModel.destroy({ where: { id } });
  }
}
