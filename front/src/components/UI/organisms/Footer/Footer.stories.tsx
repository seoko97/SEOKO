import React from "react";
import { addDecorator } from "@storybook/react";
import { ThemeProvider } from "@emotion/react";

import Footer from "./Footer";
import { lightTheme } from "@theme/.";

type DecoratorFunction = Parameters<typeof addDecorator>[0];

interface Props {
  component: React.ReactNode;
  title: string;
  decorators: DecoratorFunction[];
}

export default {
  title: "Organisms/Footer",
  component: Footer,
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

export const Default = () => <Footer />;
