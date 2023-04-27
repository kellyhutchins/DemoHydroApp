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

import { describe, it, expect } from "vitest";
import { getAppTitle } from "./appBaseUtils";
import PortalItem from "@arcgis/core/portal/PortalItem";
import { ConfigState } from "src/types/interfaces";

describe("getAppTitle", () => {
  const DEFAULT_TITLE = "Hydro Chart";
  const TEST_APP_TITLE = "Hydro Chart: Test application title";
  const TEST_MAP_PORTAL_ITEM_TITLE =
    "Test title of web map (web map portal item)";

  it(`should be '${DEFAULT_TITLE}'.`, async () => {
    console.log(
      "No title configured in app, no title in web scene portal item"
    );
    const title = getAppTitle(
      {
        title: "",
      } as ConfigState,
      {
        title: "",
      } as PortalItem
    );
    expect(title).toBe(DEFAULT_TITLE);
  });

  it(`should be '${TEST_APP_TITLE}'.`, async () => {
    console.log("Title configured in app, title in web map portal item.");
    const title = getAppTitle(
      {
        title: TEST_APP_TITLE,
      } as ConfigState,
      {
        title: TEST_MAP_PORTAL_ITEM_TITLE,
      } as PortalItem
    );
    expect(title).toBe(TEST_APP_TITLE);
  });

  it(`should be '${TEST_MAP_PORTAL_ITEM_TITLE}'.`, async () => {
    console.log("No title configured in app, title in web map portal item.");
    const title = getAppTitle(
      {
        title: "",
      } as ConfigState,
      {
        title: TEST_MAP_PORTAL_ITEM_TITLE,
      } as PortalItem
    );
    expect(title).toBe(TEST_MAP_PORTAL_ITEM_TITLE);
  });
  it(`should be '${TEST_MAP_PORTAL_ITEM_TITLE}'.`, async () => {
    console.log("Title configured in app, no title in web map portal item.");
    const title = getAppTitle(
      {
        title: TEST_APP_TITLE,
      } as ConfigState,
      {
        title: "",
      } as PortalItem
    );
    expect(title).toBe(TEST_APP_TITLE);
  });
});
