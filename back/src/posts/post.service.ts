import { NotFoundException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Transactional } from '@common/decorators/transaction.decorator';
import { SequenceRepository } from '@src/sequence/sequence.repository';
import { TagService } from '@tags/tag.service';
import { getQueryOptionsByPost } from '@utils/getQueryOptionsByPost';

import { CreatePostInput } from './dto/createPostInput.dto';
import { EditPostArgs, EditPostInput } from './dto/editPostInput.dto';
import { GetPostsInput } from './dto/getPosts.dto';
import { Post, PostModel } from './post.model';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: PostModel,
    @Inject(TagService) private tagService: TagService,
    private readonly postRepository: PostRepository,
    private readonly sequenceRepository: SequenceRepository,
  ) {}

  @Transactional()
  async createPost({ tags, ...info }: CreatePostInput) {
    const post = await this.postRepository.createPost({
      ...info,
      numId: await this.sequenceRepository.getNextSequence('post'),
    });

    const createdTag = await this.tagService.pushAndReturnTagsByPostId(
      tags,
      post._id,
    );

    post.tags = createdTag;

    await post.save();
    await post.populate('tags');

    return post;
  }

  @Transactional()
  async editPost(input: Omit<EditPostInput, 'numId'>) {
    const { _id, addTags, deleteTags } = input;

    const post = await this.postModel.findOne({ _id });

    if (!post) throw new NotFoundException('포스트가 존재하지 않습니다.');

    const [dTags, aTags] = await Promise.all([
      this.tagService.deletePostIdInTags(deleteTags, post._id),
      this.tagService.pushAndReturnTagsByPostId(addTags, post._id),
    ]);

    const updatePostArgs: EditPostArgs = {
      ...input,
      addTags: aTags,
      deleteTags: dTags,
    };

    await this.postRepository.updatePost(updatePostArgs);
    await this.postRepository.updateManyByEmptyPosts();

    return await this.postModel.findOne({ _id });
  }

  @Transactional()
  async deletePost(_id: string) {
    await this.postRepository.deletePost(_id);
    await this.tagService.deleteManyByPostId(_id);
  }

  async getPost(id: number | string) {
    const post =
      typeof id === 'number'
        ? await this.postRepository.getPostByNumId(id)
        : await this.postRepository.getPostById(id);

    if (!post) throw new NotFoundException('포스트가 존재하지 않습니다.');

    return post;
  }

  async getSiblingPost(numId: number) {
    const post = await this.postModel.findOne({ numId });

    if (!post) throw new NotFoundException('포스트가 존재하지 않습니다.');

    const [prev, next] = await this.postRepository.getSiblingPost(numId);

    return { prev, next };
  }

  async getPosts(input: GetPostsInput) {
    const { limit = 10, tag: tagName } = input ?? {};

    const where = getQueryOptionsByPost(input);

    if (tagName) {
      const tag = await this.tagService.getTag(tagName);

      if (!tag) throw new NotFoundException('존재하지 않는 태그입니다.');

      where.tags = {
        $in: tag._id,
      };
    }

    const posts = await this.postRepository.getPosts(where, limit);

    return posts;
  }
}
