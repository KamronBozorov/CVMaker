import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { User } from "./users/models/user.model";
import { AuthModule } from "./auth/auth.module";
import { RolesModule } from "./roles/roles.module";
import { Role } from "./roles/models/role.model";
import { MailService } from "./mail/mail.service";
import { MailModule } from "./mail/mail.module";
import { TelegrafModule } from "nestjs-telegraf";
import { BOT_NAME } from "./app.contstants";
import { BotModule } from "./bot/bot.module";
import { MediaModule } from "./media/media.module";
import { EducationModule } from "./education/education.module";
import { Media } from "./media/models/media.model";
import { Education } from "./education/models/education.model";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "static"),
    }),
    TelegrafModule.forRootAsync({
      botName: BOT_NAME,
      useFactory: () => ({
        token: process.env.BOT_TOKEN!,
        middlewares: [],
        include: [BotModule],
      }),
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      models: [User, Role, Media, Education],
      autoLoadModels: true,
      sync: {
        alter: true,
      },
      logging: false,
    }),
    UsersModule,
    AuthModule,
    RolesModule,
    MailModule,
    BotModule,
    MediaModule,
    EducationModule,
  ],
  controllers: [],
  providers: [MailService],
})
export class AppModule {}
