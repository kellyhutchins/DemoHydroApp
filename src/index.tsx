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

// React
import React from "react";
import { createRoot, Root } from "react-dom/client";

// Resolves esri-loader/@arcgis/core JSAPI conflict
import "src/utils/require";

// ArcGIS Core
import {
  registerMessageBundleLoader,
  createJSONLoader,
  setLocale,
  prefersRTL
} from "@arcgis/core/intl";
import PortalItem from "@arcgis/core/portal/PortalItem";
import WebMap from "@arcgis/core/WebMap";
import Error from "@arcgis/core/core/Error";

// templates-common-library
import ApplicationBase from "templates-common-library/baseClasses/ApplicationBase";
import {
  setPageTitle,
  setPageLocale
} from "templates-common-library/baseClasses/support/domHelper";
import { createMapFromItem } from "templates-common-library/baseClasses/support/itemUtils";
import { EAppTemplateType } from "templates-common-library/baseClasses/CompatibilityChecker";

// Calcite Components
import "@esri/calcite-components";
import "@esri/calcite-components/dist/calcite/calcite.css";
import { setAssetPath } from "@esri/calcite-components/dist/components";

import "@esri/calcite-components/dist/components/calcite-loader";
import "@esri/calcite-components/dist/components/calcite-progress";
import "@esri/calcite-components/dist/components/calcite-popover";
import "@esri/calcite-components/dist/components/calcite-button";

// Instant Apps Components
import "@esri/instant-apps-components/dist/components/instant-apps-header";
import "@esri/instant-apps-components/dist/components/instant-apps-social-share";

// Hyrdo Chart
import "src/index.scss";
import applicationBaseJSON from "src/config/applicationBase.json";
import applicationJSON from "src/config/application.json";
import App from "src/App";
import { getAppTitle } from "src/utils/appBaseUtils";
import { ConfigState, ThemeMode } from "src/types/interfaces";
import ConfigurationSettingsProvider from "src/Context/Providers/ConfigurationSettingsProvider";
import Portal from "@arcgis/core/portal/Portal";

// Enums
enum HydroChartApp {
  Dir_RTL = "rtl",
  ErrorMessage = "Item does not exist or is inaccessible.",
  RootID = "root"
}

enum JSAPI4 {
  env = "jsdev",
  version = "4.27",
  stylesID = "jsapiStyles"
}

const { env, version } = JSAPI4;
const get_JSAPI_CDN_CSS = (theme: ThemeMode) =>
  `https://${env}.arcgis.com/${version}/esri/themes/${theme}/main.css`;

enum URLParams {
  viewpoint = "viewpoint",
  webmap = "webmap"
}

// CONSTANTS
const BASE = "esri-instant-hydro-chart-";
const CSS = { errorMessage: `${BASE}error-message` };

// Logic for initial app set up
const createApplicationBase = (): ApplicationBase => {
  const config = applicationJSON;
  const settings = applicationBaseJSON;
  return new ApplicationBase({ config, settings });
};

const setupT9n = (base: ApplicationBase): void => {
  setupMessageBundleLoader();
  setupLocale(base);
};

const setupMessageBundleLoader = (): void => {
  const { BASE_URL } = import.meta.env;
  const pattern = BASE_URL;
  const base = BASE_URL;
  const { href } = window.location;
  const location = new URL(BASE_URL, href);
  const jsonLoader = createJSONLoader({ pattern, base, location });
  registerMessageBundleLoader(jsonLoader);
};

const setupLocale = (base: ApplicationBase): void => {
  const { locale } = base;
  setLocale(locale);
  setPageLocale(locale);
  if (prefersRTL(locale)) document.documentElement.dir = HydroChartApp.Dir_RTL;
};

const getConfig = (base: ApplicationBase): ConfigState => {
  const isWithinConfiguration = window.location !== window.parent.location;
  const { config } = base;
  const { draft } = config;
  return isWithinConfiguration ? { ...config, ...draft } : { ...config };
};

const setJSAPIStyles = (theme: ThemeMode): void => {
  const { stylesID } = JSAPI4;
  const jsapiStyles = document.getElementById(stylesID) as HTMLLinkElement;
  jsapiStyles.href = get_JSAPI_CDN_CSS(theme);
};

const getMapID_URLParams = (): string | null => {
  const { search } = window.location;
  const urlParams = new URLSearchParams(search);
  return urlParams.get(URLParams.webmap);
};

const setupTitle = (config: ConfigState, item: PortalItem): void => {
  const title = getAppTitle(config, item);
  setPageTitle(title);
  config.title = title;
};

const getAppRootJSX = (
  config: ConfigState,
  map: WebMap,
  portal: Portal
): JSX.Element => {
  return (
    <React.StrictMode>
      <ConfigurationSettingsProvider config={config}>
        <App map={map} portal={portal} />
      </ConfigurationSettingsProvider>
    </React.StrictMode>
  );
};

const mountRoot = (jsx: JSX.Element): void => {
  const root = getRootElement();
  root.render(jsx);
};

const getRootElement = (): Root => {
  const rootEl = document.getElementById(
    HydroChartApp.RootID
  ) as HTMLDivElement;
  return createRoot(rootEl);
};

const handleError = (error: Error, errorMessage: string): void => {
  const error_JSX = getErrorJSX(errorMessage);
  mountRoot(error_JSX);
  console.error(error);
};

const getErrorJSX = (message: string): JSX.Element => {
  return (
    <div className={CSS.errorMessage}>
      <p>{message}</p>
    </div>
  );
};

// Initialize app
const init = async () => {
  try {
    // Create and load the application base
    const preloadedBase = createApplicationBase();
    // TODO Update this once we have the app type in the config
    const base = await preloadedBase.load(EAppTemplateType.Basic);

    // Set up app strings and set locale accordingly
    setupT9n(base);

    // Using loaded app base - get app configuration
    const config = getConfig(base);

    // Set up initial JSAPI styles
    const { theme } = config;
    setJSAPIStyles(theme as ThemeMode);

    // Attempts to grab map portal item ID in URL params
    const mapID_URLParams = getMapID_URLParams();

    const { portal, results } = base;
    let item: PortalItem;

    if (mapID_URLParams) {
      const preloadedPortalItem = new PortalItem({
        portal,
        id: mapID_URLParams
      });
      const portalItem = await preloadedPortalItem.load();
      item = portalItem;
    } else {
      const { webMapItems } = results;
      const firstItem = webMapItems?.[0];
      const mapItem = firstItem?.value as PortalItem;
      item = mapItem;
    }

    setupTitle(config, item);

    let map: WebMap;
    const appProxies = results?.applicationItem?.value?.applicationProxies;
    map = (await createMapFromItem({ item, appProxies })) as WebMap;

    const app_JSX = getAppRootJSX(config, map, portal);
    mountRoot(app_JSX);
  } catch (error: unknown) {
    const errorMessage = (error as Error)?.message;
    handleError(error as Error, errorMessage);
  }
};

const CALCITE_ASSETS_CDN = `https://js.arcgis.com/calcite-components/1.0.7/assets`;
setAssetPath(CALCITE_ASSETS_CDN);

init();
