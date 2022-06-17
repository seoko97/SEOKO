export const bp = {
  PC: "980px",
  TABLET: "768px",
  MOBILE: "480px",
};

export const lightTheme = {
  BP: bp,
  BAKCGROUND_COLOR: {
    PRIMARY_COLOR: "#F2F5F7",
    SECONDARY_COLOR: "rgb(250, 250, 250);",
    PRIMARY_COLOR_RGBA: "rgba(242, 245, 247, 0.5)",
    THIRDARY_COLOR: "#23374D",
  },
  FONT_COLOR: {
    PRIMARY_COLOR: "#212529",
    SECONDARY_COLOR: "#374151",
    LOGO_COLOR: "#86caf4",
    BUTTON_COLOR: "#f8f9fa",
  },
  SELECTION_EFFECT_COLOR: {
    PRIMARY_COLOR: "#569aff",
    SECONDARY_COLOR: "rgb(222, 226, 230);",
  },
  BORDER_COLOR: {
    PRIMARY_COLOR: "#cccccc",
  },
  BUTTON_COLOR: {
    PRIMARY_COLOR: "#86caf4",
  },
  MARK_DOWN: {
    CODE_COLOR: "rgb(33 37 41)",
    BACK_COLOR: "rgb(233 236 239)",
  },
};

export const darkTheme = {
  BP: bp,
  BAKCGROUND_COLOR: {
    PRIMARY_COLOR: "#212529",
    SECONDARY_COLOR: "rgb(52, 58, 64)",
    PRIMARY_COLOR_RGBA: "rgba(33, 37, 41, 0.5)",
    THIRDARY_COLOR: "#444444",
  },
  FONT_COLOR: {
    PRIMARY_COLOR: "#f8f9fa",
    SECONDARY_COLOR: "#9ca3af",
    LOGO_COLOR: "#c58ff7",
    BUTTON_COLOR: "#212529",
  },
  SELECTION_EFFECT_COLOR: {
    PRIMARY_COLOR: "#569aff",
    SECONDARY_COLOR: "rgb(73, 80, 87)",
  },
  BORDER_COLOR: {
    PRIMARY_COLOR: "#cccccc",
  },
  BUTTON_COLOR: {
    PRIMARY_COLOR: "#A076F1",
  },
  MARK_DOWN: {
    CODE_COLOR: "rgb(248 249 250)",
    BACK_COLOR: "rgb(73 80 87)",
  },
};

export type ThemeType = typeof lightTheme;
