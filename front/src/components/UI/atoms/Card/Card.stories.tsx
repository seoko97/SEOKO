import React from "react";
import { addDecorator } from "@storybook/react";
import { ThemeProvider } from "@emotion/react";
import { lightTheme } from "@theme/.";

import Card from "./Card";

type DecoratorFunction = Parameters<typeof addDecorator>[0];

interface Props {
  component: React.ReactNode;
  title: string;
  decorators: DecoratorFunction[];
}

interface AppProps {
  children: React.ReactNode;
}

export default {
  title: "Atoms/Card",
  component: Card,
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

export const Default = ({ children }: AppProps) => <Card>{children}</Card>;
