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

// @arcgis/core
import WebMap from "@arcgis/core/WebMap";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

export interface ViewProps {
  map: WebMap;
}

// React Contexts
export interface IConfigurationSettingsContext extends ConfigState {
  updateHeader: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  updateTitle: React.Dispatch<React.SetStateAction<string | undefined>>;
  updateSplash: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  updateInfoIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  updateSplashTitle: React.Dispatch<React.SetStateAction<string | undefined>>;
  updateSplashContent: React.Dispatch<React.SetStateAction<string | undefined>>;
  updateSplashButtonText: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  updateLegend: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  updateFilter: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  updateFilterConfig: React.Dispatch<React.SetStateAction<any | undefined>>;
  updateTimeFilter: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  updateTimeFilterConfig: React.Dispatch<React.SetStateAction<any | undefined>>;
  updateHome: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  updateMapZoom: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  updateBookmarks: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  updateLocatWidget: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  updateLayerList: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  updateBasemapGallery: React.Dispatch<
    React.SetStateAction<boolean | undefined>
  >;
  updateBasemapGalleryConfig: React.Dispatch<
    React.SetStateAction<any | undefined>
  >;
  updateSocialShare: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  updateSearch: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  updateSearchConfiguration: React.Dispatch<
    React.SetStateAction<any | undefined>
  >;
  updateTheme: React.Dispatch<
    React.SetStateAction<Theme.Light | Theme.Dark | undefined>
  >;
  updateCustomTheme: React.Dispatch<React.SetStateAction<any | undefined>>;
  updateLogo: React.Dispatch<React.SetStateAction<any | undefined>>;
}

export interface IThemeContext {
  sharedTheme: ISharedTheme;
  token: string;
}

// Hydro Chart
// Enums
import { Theme } from "src/enums/calcite";

// Interfaces and types
export interface ConfigState {
  portalUrl?: string;
  helperServices?: HelperServices;
  appid?: string;
  type?: "webmap";
  webmap?: string;
  oauthappid?: string;
  proxyUrl?: string;
  googleAnalytics?: boolean;
  googleAnalyticsKey?: string;
  googleAnalyticsConsent?: boolean;
  googleAnalyticsConsentMsg?: string;
  mapA11yDesc?: string;
  telemetry?: Telemetry;
  header?: boolean;
  title?: string;
  splash?: boolean;
  infoIsOpen?: boolean;
  splashTitle?: string;
  splashContent?: string;
  splashButtonText?: string;
  legend?: boolean;
  enableFilter?: boolean;
  filterConfig?: any;
  timeFilter?: boolean;
  timeFilterConfig?: any;
  home?: boolean;
  mapZoom?: boolean;
  bookmarks?: boolean;
  locateWidget?: boolean;
  layerList?: boolean;
  basemapGallery?: boolean;
  basemapGalleryConfig?: any;
  socialShare?: boolean;
  screenshot?: boolean;
  search?: boolean;
  searchConfiguration?: any;
  theme?: ThemeMode;
  customTheme?: CustomTheme;
  logo?: any;
  positionManager?: any;
}

export interface Logo {
  logoImage: string;
  logoLink: string;
}

export type ThemeType = "primary" | "secondary" | "accent";
export type ThemeMode = Theme.Light | Theme.Dark;

export interface CustomTheme {
  applySharedTheme: boolean;
  applyPresetTheme: boolean;
  font: string;
  appFont: string;
  logo: string;
  logoLink: string;
  logoScale: "s" | "m" | "l";
  preset: string;
  themes: ICustomThemes;
}

interface ICustomThemes {
  primary: ICustomTheme;
  secondary: ICustomTheme;
  accent: ICustomTheme;
}

interface ICustomTheme {
  type: string;
  background: string;
  text: string;
}

interface Themes {
  primary?: ITheme;
  secondary?: ITheme;
  accent?: ITheme;
}

interface ITheme {
  background: string;
  text: string;
  type: string;
}

interface ISharedTheme {
  themes: Themes;
  logo: string;
  logoLink: string;
}

export interface ThemeColors {
  backgroundColor: string;
  textColor: string;
}

interface Telemetry {
  name: "hydro-chart";
  version: string;
  prod: TelemetryDevEnvConfig;
  dev: TelemetryDevEnvConfig;
  qa: TelemetryDevEnvConfig;
}

interface TelemetryDevEnvConfig {
  amazon: TelemetryAmazonConfig;
}

interface TelemetryAmazonConfig {
  userPoolID: string;
  app: {
    id: string;
  };
}

interface HelperServices {
  geometry: {
    url: string;
  };
  printTask: {
    url: string;
  };
  elevationSync: {
    url: string;
  };
  geocode: [
    {
      url: string;
    }
  ];
}
interface UncertaintyData {
  upper: number[];
  lower: number[];
  date: number[];
}

interface ForecastProps {
  forecastLayer: FeatureLayer | null;
  forecastFilterField: string | null;
  dataTimeField: string | null;
  forecastRecordCount: number | null;
  selectionId: string | null;
}

interface UncertaintyProps {
  selectionId: string;
  isGlobal: boolean;
}

interface ChartDataProps {
  forecastRecordCount: number;
  forecastFilterField: string;
  dataTimeField: string;
  returnPeriodField: string;
  forecastLayer: FeatureLayer;
}
