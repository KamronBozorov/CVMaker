import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./models/user.model";
import { JwtModule } from "@nestjs/jwt";
import { FileModule } from "src/file/file.module";
import { MediaModule } from "src/media/media.module";
import { RolesModule } from "src/roles/roles.module";

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule,
    FileModule,
    MediaModule,
    RolesModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
