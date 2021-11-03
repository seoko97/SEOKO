const bp = {
  HDPC: "1200px",
  PC: "980px",
  TABLET: "768px",
  MOBILE: "480px",
};

export const lightTheme = {
  BAKCGROUND_COLOR: {
    PRIMARY_COLOR: "#F2F5F7",
    SECONDARY_COLOR: "hsl(0, 0%, 97%)",
  },
  FONT_COLOR: {
    PRIMARY_COLOR: "#212529",
    SECOND_COLOR: "#1b2e46",
    LOGO_COLOR: "#bda6d2",
  },
  BP: bp,
};

export const darkTheme = {
  BAKCGROUND_COLOR: {
    PRIMARY_COLOR: "#212529",
    SECONDARY_COLOR: "hsl(0, 0%, 41%)",
  },
  FONT_COLOR: {
    PRIMARY_COLOR: "#f8f9fa",
    SECONDARY_COLOR: "#95a1b2",
    LOGO_COLOR: "#c58ff7",
  },
  BP: bp,
};

export type ThemeType = typeof lightTheme;
