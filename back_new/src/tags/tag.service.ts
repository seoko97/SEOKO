import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tag, TagModel } from './tag.model';

@Injectable()
export class TagService {
  constructor(@InjectModel(Tag.name) private tagModel: TagModel) {}

  async findOrCreate(content: string) {
    return await this.tagModel.findOrCreate(content);
  }

  async getTags() {
    return await this.tagModel.find();
  }
}
