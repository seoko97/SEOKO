import React from "react";
import { addDecorator } from "@storybook/react";
import { ThemeProvider } from "@emotion/react";
import { lightTheme } from "@theme/.";

import SmallPost from "./SmallPost";

type DecoratorFunction = Parameters<typeof addDecorator>[0];

interface Props {
  component: React.ReactNode;
  title: string;
  decorators: DecoratorFunction[];
}

export default {
  title: "Molecules/PostItem",
  component: SmallPost,
  decorators: [
    (Story) => (
      <ThemeProvider theme={lightTheme}>
        <Story />
      </ThemeProvider>
    ),
  ],
} as Props;

export const Default = () => (
  <SmallPost
    post={{
      _id: "626e913492c10269f24156aa",
      title: "tt",
      coverImg:
        "https://velog.velcdn.com/post-images/godori/496c0830-3dc1-11e9-bc03-611ba17bddf2/banner-maker.png",
      createdAt: "2022-05-01T13:55:00.504Z",
    }}
  />
);
