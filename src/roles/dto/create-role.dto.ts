import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({
    example: 'admin',
    description: 'Role nomi',
  })
  name: string;
}
