import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateMediaDto } from "./dto/create-media.dto";
import { UpdateMediaDto } from "./dto/update-media.dto";
import { Media } from "./models/media.model";
import { FileService } from "src/file/file.service";

@Injectable()
export class MediaService {
  constructor(
    @InjectModel(Media) private mediaModel: typeof Media,
    private readonly fileService: FileService,
  ) {}

  async create(createMediaDto: CreateMediaDto, photo: any): Promise<Media> {
    const fileName = await this.fileService.saveFile(photo);

    const media = await this.mediaModel.create({
      ...createMediaDto,
      media_name: fileName,
    });

    return media;
  }

  async findAll(): Promise<Media[]> {
    return await this.mediaModel.findAll();
  }

  async findOne(table_id: number, table_name: string): Promise<any> {
    const media = await this.mediaModel.findOne({
      where: { table_id, table_name },
      include: { all: true },
    });
    if (!media) {
      return {};
    }
    return media;
  }

  async findByPk(id: number) {
    const media = await this.mediaModel.findByPk(id, {
      include: { all: true },
    });

    if (!media) throw new NotFoundException(`Media with ID ${id} not found`);

    return media;
  }

  async update(id: number, updateMediaDto: UpdateMediaDto): Promise<Media> {
    const media = await this.findByPk(id);
    return await media.update(updateMediaDto);
  }

  async remove(id: number): Promise<void> {
    const media = await this.findByPk(id);
    await media.destroy();
  }
}
