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

import { useEffect, useState } from "react";

import { ConfigurationSettingsContext } from "src/Context/Contexts";
import { ConfigState, ThemeMode } from "src/types/interfaces";

import { Sanitizer } from "@esri/arcgis-html-sanitizer";
import { createSanitizerInstance } from "templates-common-library/functionality/securityUtils";

interface ConfigurationSettingsProviderProps {
  config: ConfigState;
  children: React.ReactElement;
}

const CATS_APP = "cats-app";

const sanitizer = createSanitizerInstance(Sanitizer);

const ConfigurationSettingsProvider = ({
  config,
  children
}: ConfigurationSettingsProviderProps) => {
  const [header, updateHeader] = useState(config.header);
  const [title, updateTitle] = useState(config.title);
  const [splash, updateSplash] = useState(config.splash);
  const [infoIsOpen, updateInfoIsOpen] = useState(config.splash ? true : false);
  const [splashTitle, updateSplashTitle] = useState(config.splashTitle);
  const [splashContent, updateSplashContent] = useState(
    sanitizer.sanitize(config.splashContent)
  );
  const [splashButtonText, updateSplashButtonText] = useState(
    config.splashButtonText
  );
  const [legend, updateLegend] = useState(config.legend);
  const [enableFilter, updateFilter] = useState(config.enableFilter);
  const [filterConfig, updateFilterConfig] = useState(config.filterConfig);
  const [timeFilter, updateTimeFilter] = useState(config.timeFilter);
  const [timeFilterConfig, updateTimeFilterConfig] = useState(
    config.timeFilterConfig
  );
  const [home, updateHome] = useState(config.home);
  const [mapZoom, updateMapZoom] = useState(config.mapZoom);
  const [bookmarks, updateBookmarks] = useState(config.bookmarks);
  const [locateWidget, updateLocatWidget] = useState(config.locateWidget);
  const [layerList, updateLayerList] = useState(config.layerList);
  const [basemapGallery, updateBasemapGallery] = useState(
    config.basemapGallery
  );
  const [basemapGalleryConfig, updateBasemapGalleryConfig] = useState(
    config.basemapGalleryConfig
  );
  const [socialShare, updateSocialShare] = useState(config.socialShare);
  const [search, updateSearch] = useState(config.search);
  const [searchConfiguration, updateSearchConfiguration] = useState(
    config.searchConfiguration
  );
  const [theme, updateTheme] = useState(config.theme);
  const [customTheme, updateCustomTheme] = useState(config.customTheme);
  const [logo, updateLogo] = useState(config.logo);

  const updateState = (fieldName: string, value: unknown) => {
    switch (fieldName) {
      case "header":
        updateHeader(value as boolean);
        return;
      case "title":
        updateTitle(value as string);
        return;
      case "splash":
        updateSplash(value as boolean);
        return;
      case "splashTitle":
        updateSplashTitle(value as string);
        return;
      case "splashContent":
        updateSplashContent(sanitizer.sanitize(value as string));
        return;
      case "splashButtonText":
        updateSplashButtonText(value as string);
        return;
      case "legend":
        updateLegend(value as boolean);
        return;
      case "enableFilter":
        updateFilter(value as boolean);
        return;
      case "filterConfig":
        updateFilterConfig(value as any);
        return;
      case "timeFilter":
        updateTimeFilter(value as boolean);
        return;
      case "timeFilterConfig":
        updateTimeFilterConfig(value as any);
        return;
      case "home":
        updateHome(value as boolean);
        return;
      case "mapZoom":
        updateMapZoom(value as boolean);
        return;
      case "bookmarks":
        updateBookmarks(value as boolean);
        return;
      case "locateWidget":
        updateLocatWidget(value as boolean);
        return;
      case "layerList":
        updateLayerList(value as boolean);
        return;
      case "basemapGallery":
        updateBasemapGallery(value as boolean);
        return;
      case "basemapGalleryConfig":
        updateBasemapGalleryConfig(value as any);
        return;
      case "socialShare":
        updateSocialShare(value as boolean);
        return;
      case "search":
        updateSearch(value as boolean);
        return;
      case "searchConfiguration":
        updateSearchConfiguration(value as any);
        return;
      case "theme":
        updateTheme(value as ThemeMode);
        return;
      case "customTheme":
        updateCustomTheme(value as any);
        return;
      case "logo":
        updateLogo(value as any);
        return;
      default:
        return;
    }
  };

  const handleAppFont = () => {
    const appFont = customTheme?.appFont;
    const id = "appFont";
    let style = document.getElementById(id);
    const fontStyling = `
        html,
        body,
        .esri-widget,
        .esri-input,
        instant-apps-social-share{
          --calcite-sans-family: ${appFont} !important;
          font-family: ${appFont} !important;
        }`;
    if (style !== null) {
      style.innerHTML = fontStyling;
    } else {
      style = document.createElement("style");
      style.id = id;
      style.innerHTML = fontStyling;
      document.head.appendChild(style);
    }
  };

  useEffect(() => {
    const handleConfigurationUpdates = (e: MessageEvent) => {
      const type = e?.data?.type;
      if (type === CATS_APP) {
        const dataKeys = Object.keys(e.data);
        const id = dataKeys.filter((key) => key !== "type")[0];
        if (e.data[id] === undefined) return;
        const value = e.data[id];
        updateState(id, value);
      }
    };
    const withinConfigurationExperience: boolean =
      window.location !== window.parent.location;
    if (withinConfigurationExperience)
      window.addEventListener("message", handleConfigurationUpdates, false);
  }, []);

  useEffect(() => {
    handleAppFont();
  }, [customTheme]);

  return (
    <ConfigurationSettingsContext.Provider
      value={{
        header,
        title,
        splash,
        infoIsOpen,
        splashTitle,
        splashContent,
        splashButtonText,
        legend,
        enableFilter,
        filterConfig,
        timeFilter,
        timeFilterConfig,
        home,
        mapZoom,
        bookmarks,
        locateWidget,
        layerList,
        basemapGallery,
        basemapGalleryConfig,
        socialShare,
        search,
        searchConfiguration,
        theme,
        customTheme,
        logo,
        updateHeader,
        updateTitle,
        updateSplash,
        updateInfoIsOpen,
        updateSplashTitle,
        updateSplashContent,
        updateSplashButtonText,
        updateLegend,
        updateFilter,
        updateFilterConfig,
        updateTimeFilter,
        updateTimeFilterConfig,
        updateHome,
        updateMapZoom,
        updateBookmarks,
        updateLocatWidget,
        updateLayerList,
        updateBasemapGallery,
        updateBasemapGalleryConfig,
        updateSocialShare,
        updateSearch,
        updateSearchConfiguration,
        updateTheme,
        updateCustomTheme,
        updateLogo
      }}
    >
      {children}
    </ConfigurationSettingsContext.Provider>
  );
};

export default ConfigurationSettingsProvider;
