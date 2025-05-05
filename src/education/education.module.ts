import { Module } from "@nestjs/common";
import { EducationService } from "./education.service";
import { EducationController } from "./education.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Education } from "./models/education.model";
import { MediaModule } from "src/media/media.module";

@Module({
  imports: [SequelizeModule.forFeature([Education]), MediaModule],
  controllers: [EducationController],
  providers: [EducationService],
  exports: [EducationService],
})
export class EducationModule {}
