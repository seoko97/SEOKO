import React from "react";
import { addDecorator } from "@storybook/react";
import { ThemeProvider } from "@emotion/react";
import { lightTheme } from "@theme/.";

import Input from "./Input";

type DecoratorFunction = Parameters<typeof addDecorator>[0];

interface Props {
  component: React.ReactNode;
  title: string;
  decorators: DecoratorFunction[];
}

export default {
  title: "Atoms/Input",
  component: Input,
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

export const Default = () => <Input onChange={() => console.log("x")} value="asd" />;
