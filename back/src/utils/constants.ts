import { PipelineStage } from 'mongoose';

const GET_TAGS_OPTIONS: PipelineStage[] = [
  {
    $lookup: {
      from: 'posts',
      localField: 'posts',
      foreignField: '_id',
      as: 'posts',
    },
  },
  {
    $match: {
      'posts.isTemporary': { $ne: true },
    },
  },
  {
    $project: {
      _id: 1,
      name: 1,
      createdAt: 1,
      updatedAt: 1,
      postCount: { $size: '$posts' },
      posts: {
        $filter: {
          input: '$posts',
          as: 'post',
          cond: {
            $eq: ['$$post.isTemporary', false],
          },
        },
      },
    },
  },
  {
    $sort: {
      postCount: -1,
    },
  },
];

const GET_TAG_OPTIONS: PipelineStage[] = [
  {
    $lookup: {
      from: 'posts',
      localField: 'posts',
      foreignField: '_id',
      as: 'posts',
    },
  },
  {
    $project: {
      _id: 1,
      name: 1,
      createdAt: 1,
      updatedAt: 1,
      posts: {
        $filter: {
          input: '$posts',
          as: 'post',
          cond: {
            $ne: ['$$post.isTemporary', true],
          },
        },
      },
    },
  },
];

export { GET_TAGS_OPTIONS, GET_TAG_OPTIONS };
