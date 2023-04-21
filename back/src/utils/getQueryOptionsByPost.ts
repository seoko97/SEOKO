import { GetPostsInput } from '@posts/dto/getPosts.dto';
import { PostDocument } from '@posts/post.model';
import { FilterQuery } from 'mongoose';

export const getQueryOptionsByPost = (input: GetPostsInput) => {
  const { category, isTemporary, lastId, text } = input;

  const where: FilterQuery<PostDocument> = {
    isTemporary: isTemporary ?? false,
  };

  if (category) {
    where.category = category;
  }

  if (lastId) {
    where._id = { $lt: lastId };
  }

  if (text) {
    where.$or = [
      { title: { $regex: text, $options: 'i' } },
      { content: { $regex: text, $options: 'i' } },
    ];
  }

  return where;
};
