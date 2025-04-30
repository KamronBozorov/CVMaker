import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/models/user.model';
import { Response } from 'express';
import { MailService } from 'src/mail/mail.service';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly roleService: RolesService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { email, phone, role_id } = signUpDto;

    const role = await this.roleService.findOne(role_id);

    if (!role) throw new NotFoundException('Role not found');

    if (
      (await this.usersService.findByEmail(email)) ||
      (await this.usersService.findByPhone(phone))
    )
      throw new ConflictException('User already exists');

    const user = await this.usersService.create(signUpDto);

    try {
      await this.mailService.sendMail(user);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Error while sending email');
    }

    return {
      message: 'Activation link sent to your email',
    };
  }

  async signIn(signInDto: SignInDto, res: Response) {
    const { email, password } = signInDto;

    const user = await this.usersService.findByEmail(email);
    if (!user) throw new NotFoundException('User not found');

    const isValidPass = await bcrypt.compare(password, user.hashed_password);
    if (!isValidPass) {
      throw new BadRequestException('Password or email not correct');
    }

    const tokens = await this.generateTokens(user);

    user.hashed_ref_token = await bcrypt.hash(tokens.refreshToken, 10);
    await user.save();

    res.cookie('refresh_token', tokens.refreshToken, {
      maxAge: 1296000000,
      httpOnly: true,
    });

    return {
      message: 'You have been logged in successfully',
      accessToken: tokens.accessToken,
    };
  }

  async generateTokens(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      is_active: user.is_active,
      role: user.role.name,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.ACCESS_TOKEN_KEY,
      expiresIn: process.env.ACCEES_TOKEN_TIME,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_TOKEN_KEY,
      expiresIn: process.env.REFRESH_TOKEN_TIME,
    });

    return { accessToken, refreshToken };
  }

  async activate(link: string) {
    const user = await this.usersService.findByLink(link);
    if (!user) throw new NotFoundException('User not found');

    if (user.is_active) throw new BadRequestException('User already activated');

    user.is_active = true;
    await user.save();

    return {
      message: 'User activated successfully',
    };
  }
}
