import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config.js";

export const setItemToStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItemStorage = (key: string) => {
  return (
    localStorage.getItem(key) && JSON.parse(localStorage.getItem(key) || "")
  );
};

export const clearItemStorage = () => {
  localStorage.clear();
};

export const getThemeAppearance = () => {
  const fullConfig = resolveConfig(tailwindConfig);

  return {
    colors: fullConfig.theme?.colors,
    fontSize: fullConfig.theme?.fontSize,
    spacing: fullConfig.theme?.spacing,
    boxShadow: fullConfig.theme?.boxShadow,
  };
};
