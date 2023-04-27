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

import { describe, test, expect } from "vitest";
import { render } from "@testing-library/react";
import Header from "./Header";

import ConfigurationSettingsProvider from "src/Context/Providers/ConfigurationSettingsProvider";
import { getAppTitle } from "src/utils/appBaseUtils";
import PortalItem from "@arcgis/core/portal/PortalItem";
import { ConfigState } from "src/types/interfaces";

describe("Header", () => {
  const appTitle = "Here is a title configured in the app data";
  const portalItemTitle = "Here is a title on the portal item";

  const appData = {
    title: appTitle
  };

  const portalItem = {
    title: portalItemTitle
  } as PortalItem;

  const config = {
    title: getAppTitle(appData, portalItem),
    header: false
  };

  function renderHeader(config: ConfigState) {
    return render(
      <ConfigurationSettingsProvider config={config}>
        <Header />
      </ConfigurationSettingsProvider>
    );
  }

  test("should not show content when header: false", () => {
    renderHeader(config);
    const header = document.querySelector("instant-apps-header") as HTMLInstantAppsHeaderElement;
    expect(header).toBeFalsy();
  });

  test("should content when header: true", () => {
    renderHeader({ ...config, header: true });
    const header = document.querySelector("instant-apps-header") as HTMLInstantAppsHeaderElement;
    expect(header).toBeTruthy();
  });

  test(`Title text should be '${appTitle}'`, () => {
    const configState = { ...config, header: true };
    renderHeader(configState);
    const header = document.querySelector("instant-apps-header") as HTMLInstantAppsHeaderElement;
    expect(header.titleText).toEqual("Here is a title configured in the app data");
  });

  test(`Title text should be '${portalItem}'`, () => {
    const configState = { ...config, title: getAppTitle({ title: "" }, portalItem), header: true };
    renderHeader(configState);
    const header = document.querySelector("instant-apps-header") as HTMLInstantAppsHeaderElement;
    expect(header.titleText).toEqual("Here is a title on the portal item");
  });
});
