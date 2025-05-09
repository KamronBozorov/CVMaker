import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { MediaService } from "./media.service";
import { CreateMediaDto } from "./dto/create-media.dto";
import { UpdateMediaDto } from "./dto/update-media.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes } from "@nestjs/swagger";

@Controller("media")
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  @UseInterceptors(FileInterceptor("photo"))
  create(@Body() createMediaDto: CreateMediaDto, @UploadedFile() photo: any) {
    console.log("Create methodga kirdi:", { createMediaDto, photo });
    return this.mediaService.create(createMediaDto, photo);
  }

  @Get()
  findAll() {
    return this.mediaService.findAll();
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateMediaDto: UpdateMediaDto) {
    return this.mediaService.update(+id, updateMediaDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.mediaService.remove(+id);
  }
}
