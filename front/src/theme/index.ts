export const bp = {
  HDPC: "1280px",
  PC: "980px",
  TABLET: "768px",
  MOBILE: "480px",
};

export const BOX_SHADOW = {
  PRIMARY: "rgb(0 0 0 / 4%) 0px 4px 16px 0px",
  EFFECT: "rgb(0 0 0 / 15%) 0px 4px 16px 0px",
};

export const lightTheme = {
  BP: bp,
  BACKGROUND_COLOR: {
    PRIMARY_COLOR: "#F2F5F7",
    SECONDARY_COLOR: "rgb(250, 250, 250);",
    PRIMARY_COLOR_RGBA: "rgba(242, 245, 247, 0.5)",
    THIRDLY_COLOR: "#23374D",
  },
  FONT_COLOR: {
    PRIMARY_COLOR: "#212529",
    SECONDARY_COLOR: "#2b4f76",
    LOGO_COLOR: "#86caf4",
  },
  SELECTION_EFFECT_COLOR: {
    PRIMARY_COLOR: "#569aff",
    SECONDARY_COLOR: "rgb(222, 226, 230);",
  },
  BORDER_COLOR: {
    PRIMARY_COLOR: "#d7dfe8",
  },
  BUTTON_COLOR: {
    PRIMARY_COLOR: "#86caf4",
    DANGER_COLOR: "#ff4d4f",
  },
  MARK_DOWN: {
    CODE_COLOR: "rgb(33 37 41)",
    CODE_COLOR_SECONDARY: "#ec4899",
    BACK_COLOR: "rgb(233 236 239)",
  },
  BOX_SHADOW,
};

export const darkTheme = {
  BP: bp,
  BACKGROUND_COLOR: {
    PRIMARY_COLOR: "#212529",
    SECONDARY_COLOR: "rgb(52, 58, 64)",
    PRIMARY_COLOR_RGBA: "rgba(33, 37, 41, 0.5)",
    THIRDLY_COLOR: "#444444",
  },
  FONT_COLOR: {
    PRIMARY_COLOR: "#f8f9fa",
    SECONDARY_COLOR: "#9ca3af",
    LOGO_COLOR: "#c58ff7",
  },
  SELECTION_EFFECT_COLOR: {
    PRIMARY_COLOR: "#569aff",
    SECONDARY_COLOR: "rgb(73, 80, 87)",
  },
  BORDER_COLOR: {
    PRIMARY_COLOR: "#b4bac2",
  },
  BUTTON_COLOR: {
    PRIMARY_COLOR: "#A076F1",
    DANGER_COLOR: "#ff4d4f",
  },
  MARK_DOWN: {
    CODE_COLOR: "rgb(248 249 250)",
    CODE_COLOR_SECONDARY: "#c58ff7",
    BACK_COLOR: "rgb(45, 50, 54)",
  },
  BOX_SHADOW,
};

export type ThemeType = typeof lightTheme;
