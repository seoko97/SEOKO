import "@emotion/react";
import { ThemeType } from ".";

declare module "@emotion/react" {
  export interface Theme extends ThemeType {
    end: string;
  }
}
