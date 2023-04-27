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

import { useContext } from "react";
import "@esri/instant-apps-components/dist/components/instant-apps-social-share";
import { InstantAppsSocialShare } from "@esri/instant-apps-components-react";
import MapView from "@arcgis/core/views/MapView";
import { ConfigState } from "src/types/interfaces";
import {
  ConfigurationSettingsContext,
  ViewContext
} from "src/Context/Contexts";
import { CalciteMode } from "src/enums/calcite";
import { Theme } from "src/enums";

import { CSSVariables } from "src/support/constants";

const { InstantAppsComponents } = CSSVariables;

const SLOT = "actions-end";

const SocialShare = () => {
  const { customTheme, socialShare, theme } = useContext(
    ConfigurationSettingsContext
  ) as ConfigState;
  const view = useContext(ViewContext) as MapView;
  const primary = customTheme?.themes?.primary;
  const applyTheme =
    customTheme?.applyPresetTheme || customTheme?.applySharedTheme;
  const style = applyTheme
    ? { [InstantAppsComponents.SocialShare.buttonIconColor]: primary?.text }
    : {};
  const calciteMode =
    theme === Theme.Light ? CalciteMode.Light : CalciteMode.Dark;

  return socialShare ? (
    <InstantAppsSocialShare
      className={calciteMode}
      slot={SLOT}
      style={style}
      view={view}
    />
  ) : null;
};

export default SocialShare;
