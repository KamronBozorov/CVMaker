import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateEducationDto } from "./dto/create-education.dto";
import { UpdateEducationDto } from "./dto/update-education.dto";
import { Education } from "./models/education.model";
import { MediaService } from "src/media/media.service";

@Injectable()
export class EducationService {
  constructor(
    @InjectModel(Education) private educationModel: typeof Education,
    private readonly mediaService: MediaService,
  ) {}

  async create(dto: CreateEducationDto): Promise<Education> {
    return await this.educationModel.create(dto);
  }

  async findAll(): Promise<Education[]> {
    return await this.educationModel.findAll();
  }

  async findOne(id: number): Promise<any> {
    const edu = await this.educationModel.findByPk(id, {
      include: { all: true },
    });
    if (!edu) throw new NotFoundException("Education not found");

    const media = await this.mediaService.findOne(edu.id, "educations");

    const plainUser = edu.toJSON();
    const plainMedia = media.toJSON ? media.toJSON() : media;

    return {
      ...plainUser,
      logo: plainMedia,
    };
  }

  async update(id: number, dto: UpdateEducationDto): Promise<Education> {
    const edu = await this.findOne(id);
    return await edu.update(dto);
  }

  async remove(id: number): Promise<void> {
    const edu = await this.findOne(id);
    await edu.destroy();
  }
}
