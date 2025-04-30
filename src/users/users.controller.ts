import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { User } from './models/user.model';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';
import { SelfGuard } from 'src/common/guards/self.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: 'User yaratadi',
  })
  @ApiCreatedResponse({
    description: "Yangi yaratilgan user id'si",
    type: User,
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Roles('admin', 'superadmin')
  @UseGuards(RoleGuard)
  @UseGuards(AuthGuard)
  @ApiBearerAuth('access_token')
  @ApiOperation({
    summary: 'Userlarni oladi',
  })
  @ApiOkResponse({
    example: 'asdadadsa',
    description: 'asdasda',
  })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({
    summary: 'Userni ID b-n oladi',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(SelfGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Userni yangilaydi',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(SelfGuard)
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: "Userni o'chiradi",
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
