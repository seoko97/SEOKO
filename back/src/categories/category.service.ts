import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryModel } from './category.model';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: CategoryModel,
  ) {}
  async addCategory(name: string) {
    return await this.categoryModel.findOrCreate(name);
  }

  async update(_id: string, query: any) {
    const a = await this.categoryModel.findOneAndUpdate({ _id }, query);
    console.log('@', a);
    return a;
  }

  async delete(_id: string) {
    const category = await this.categoryModel.findByIdAndDelete(_id);

    return { ok: true };
  }
}
