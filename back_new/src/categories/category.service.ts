import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';
import { Category, CategoryModel } from './category.model';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: CategoryModel,
  ) {}

  // 단일 포스트
  async test(_id: string) {
    return await this.categoryModel.findById(_id);
  }

  async update(_id: string | ObjectId, query: any) {
    return await this.categoryModel.findOneAndUpdate({ _id }, query);
  }
}
