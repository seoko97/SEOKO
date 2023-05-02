import { InMemoryCacheConfig } from "@apollo/client";
import { mergeItem } from "./mergeItem";

const MEMORY_CACHE_OPTIONS: InMemoryCacheConfig = {
  typePolicies: {
    Query: {
      fields: {
        getPosts: {
          keyArgs: ["input", ["category", "tag", "limit", "isTemporary", "text"]],
          merge: mergeItem,
        },
      },
    },
  },
};

export { MEMORY_CACHE_OPTIONS };
