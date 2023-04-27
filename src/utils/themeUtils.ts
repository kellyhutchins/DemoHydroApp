import { useContext } from "react";
import { ThemeContext } from "src/Context/Contexts";
import { checkCustomTheme } from "templates-common-library/functionality/configUtils";
import {
  CustomTheme,
  IConfigurationSettingsContext,
  IThemeContext,
  Logo,
  ThemeColors,
  ThemeType
} from "src/types/interfaces";

export function getThemeColors({ customTheme }: IConfigurationSettingsContext, type: ThemeType) {
  const { sharedTheme } = useContext(ThemeContext) as IThemeContext;
  const applyCustomTheme = false;
  const applySharedTheme = false;
  const useCustomTheme = checkCustomTheme(applyCustomTheme, customTheme as CustomTheme);
  const theme = { applySharedTheme, customTheme, sharedTheme };
  return calculateThemeColors(theme, type, useCustomTheme);
}

export function calculateThemeColors(
  { applySharedTheme, customTheme, sharedTheme },
  type: ThemeType,
  useCustomTheme?: boolean
): ThemeColors {
  const noStyle = { backgroundColor: "", textColor: "" };
  const applySharedTheme_Deprecated = applySharedTheme && !customTheme;
  const applySharedTheme_CustomTheme = customTheme?.preset === "shared";
  const useSharedTheme = applySharedTheme_Deprecated || applySharedTheme_CustomTheme;

  if (useSharedTheme) {
    return {
      backgroundColor: sharedTheme?.themes?.[type]?.background,
      textColor: sharedTheme?.themes?.[type]?.text
    };
  } else if (customTheme) {
    return useCustomTheme
      ? {
          backgroundColor: customTheme.themes[type].background,
          textColor: customTheme.themes[type].text
        }
      : noStyle;
  } else {
    return noStyle;
  }
}

export function getFont({ customTheme }: IConfigurationSettingsContext): string | undefined {
  return customTheme?.font;
}

export function getLogo({ customTheme }: IConfigurationSettingsContext, { sharedTheme, token }: IThemeContext): Logo {
  const isSharedTheme = customTheme?.applySharedTheme && customTheme?.preset === "shared";

  const getLogoHelper = (type: "logo" | "logoLink") => {
    return isSharedTheme ? sharedTheme?.[type] : customTheme?.applyPresetTheme ? customTheme?.[type] : "";
  };

  const logo = getLogoHelper("logo");
  const logoLink = getLogoHelper("logoLink");

  const tokenParam = token ? `?token=${token}` : "";
  const logoImage = logo ? `${logo}${tokenParam}` : "";

  return { logoImage, logoLink };
}
