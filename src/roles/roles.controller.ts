import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Role } from './models/role.model';
import { AuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/role.decorator';

@Roles('superadmin')
@UseGuards(RoleGuard)
@UseGuards(AuthGuard)
@ApiBearerAuth('access_token')
@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @ApiOperation({ summary: 'Yangi role yaratish' })
  @ApiCreatedResponse({
    description: "Yaratilgan role ma'lumotlari",
    type: Role,
  })
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @ApiOperation({ summary: 'Barcha rolelarni olish' })
  @ApiOkResponse({
    description: "Barcha rolelar ma'lumotlari",
    type: [Role],
  })
  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @ApiOperation({ summary: 'ID orqali bitta role olish' })
  @ApiOkResponse({
    description: "Topilgan role ma'lumotlari",
    type: Role,
  })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.findOne(id);
  }

  @ApiOperation({ summary: "Role ma'lumotlarini yangilash" })
  @ApiOkResponse({
    description: "Yangilangan role ma'lumotlari",
    type: Role,
  })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @ApiOperation({ summary: "Role o'chirish" })
  @ApiOkResponse({
    description: "O'chirilgan role IDsi yoki o'chirish holati",
    type: Number,
  })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.rolesService.remove(id);
  }
}
