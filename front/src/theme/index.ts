const bp = {
  HDPC: "1200px",
  PC: "980px",
  TABLET: "768px",
  MOBILE: "480px",
};

export const lightTheme = {
  BP: bp,
  BAKCGROUND_COLOR: {
    PRIMARY_COLOR: "#F2F5F7",
    SECONDARY_COLOR: "hsl(0, 0%, 97%)",
    PRIMARY_COLOR_RGBA: "rgba(242, 245, 247, 0.5)",
    THIRDARY_COLOR: "#23374D",
  },
  FONT_COLOR: {
    PRIMARY_COLOR: "#212529",
    SECONDARY_COLOR: "#1b2e46",
    LOGO_COLOR: "#86caf4",
    BUTTON_COLOR: "#f8f9fa",
  },
  SELECTION_EFFECT_COLOR: {
    PRIMARY_COLOR: "#426cb4",
    SECONDARY_COLOR: "#cccccc",
  },
  BORDER_COLOR: {
    PRIMARY_COLOR: "#cccccc",
  },
  BUTTON_COLOR: {
    PRIMARY_COLOR: "#86caf4",
  },
};

export const darkTheme = {
  BP: bp,
  BAKCGROUND_COLOR: {
    PRIMARY_COLOR: "#212529",
    SECONDARY_COLOR: "#2b3035",
    PRIMARY_COLOR_RGBA: "rgba(33, 37, 41, 0.5)",
    THIRDARY_COLOR: "#444444",
  },
  FONT_COLOR: {
    PRIMARY_COLOR: "#f8f9fa",
    SECONDARY_COLOR: "#151516",
    LOGO_COLOR: "#c58ff7",
    BUTTON_COLOR: "#212529",
  },
  SELECTION_EFFECT_COLOR: {
    PRIMARY_COLOR: "#569aff",
    SECONDARY_COLOR: "#cccccc",
  },
  BORDER_COLOR: {
    PRIMARY_COLOR: "#ccc",
  },
  BUTTON_COLOR: {
    PRIMARY_COLOR: "#A076F1",
  },
};

export type ThemeType = typeof lightTheme;
