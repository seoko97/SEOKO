import React from "react";
import { addDecorator } from "@storybook/react";
import { ThemeProvider } from "@emotion/react";

import Header from "./Header";
import { lightTheme } from "@theme/.";

type DecoratorFunction = Parameters<typeof addDecorator>[0];

interface Props {
  component: React.ReactNode;
  title: string;
  decorators: DecoratorFunction[];
}

export default {
  title: "Organisms/Header",
  component: Header,
  decorators: [
    (Story) => (
      <>
        <ThemeProvider theme={lightTheme}>
          <Story />
        </ThemeProvider>
      </>
    ),
  ],
} as Props;

export const Default = () => <Header />;
