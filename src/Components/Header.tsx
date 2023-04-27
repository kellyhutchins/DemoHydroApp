// Copyright 2023 Esri
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.​

import "@esri/instant-apps-components/dist/components/instant-apps-header";
import { InstantAppsHeader } from "@esri/instant-apps-components-react";

import SocialShare from "src/Components/SocialShare";

import { useContext } from "react";
import {
  ConfigurationSettingsContext,
  ThemeContext
} from "src/Context/Contexts";
import {
  IConfigurationSettingsContext,
  IThemeContext
} from "src/types/interfaces";

import { getFont, getLogo, getThemeColors } from "src/utils/themeUtils";

const CALCITE_SANS_FAMILY = "--calcite-sans-family";
const ICON_COLOR_CLASS = "--calcite-ui-text-1";
const DEFAULT_FONT = '"Avenir Next", "Avenir", "Helvetica Neue", sans-serif';
const key = "instant-apps-hydro-chart-header";

const Header = () => {
  const configSettingsContext = useContext(
    ConfigurationSettingsContext
  ) as IConfigurationSettingsContext;
  const themeContext = useContext(ThemeContext) as IThemeContext;

  const { customTheme, header, title, splash, infoIsOpen, updateInfoIsOpen } =
    configSettingsContext;

  const { logoImage, logoLink } = getLogo(configSettingsContext, themeContext);
  const { backgroundColor, textColor } = getThemeColors(
    configSettingsContext,
    "primary"
  );

  const font = getFont(configSettingsContext);

  const logoScale = customTheme?.logoScale;

  const style = {
    [CALCITE_SANS_FAMILY]: font ?? DEFAULT_FONT,
    [ICON_COLOR_CLASS]: textColor
  };

  const onInfoIsOpenChanged = (e: CustomEvent) => updateInfoIsOpen(e.detail);

  const props = {
    titleText: title,
    infoButton: splash,
    key,
    style,
    textColor,
    backgroundColor,
    logoImage,
    logoLink,
    logoScale,
    splash,
    infoIsOpen,
    onInfoIsOpenChanged
  };

  return header ? (
    <InstantAppsHeader {...props}>
      <SocialShare />
    </InstantAppsHeader>
  ) : (
    <></>
  );
};

export default Header;
