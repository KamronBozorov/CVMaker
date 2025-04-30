import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { SignInDto } from './dto/sign-in.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @ApiOperation({
    summary: "Ro'yxatdan o'tish",
  })
  @ApiCreatedResponse({
    type: SignUpDto,
    description: "Ro'yxatdan o'tgan user ma'lumotlari",
  })
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('sign-in')
  @ApiOperation({
    summary: 'Tizimga kirish',
  })
  @HttpCode(200)
  @ApiCreatedResponse({
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'You have been logged in successfully',
        },
      },
    },
  })
  signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signIn(signInDto, res);
  }

  @Get('activate/:link')
  @ApiOperation({
    summary: 'Userni tasdiqlaydi',
  })
  @ApiCreatedResponse({
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'User activated successfully',
        },
      },
    },
  })
  activate(@Param('link') link: string) {
    console.log(link);

    return this.authService.activate(link);
  }
}
