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
import { classes, getCSSClass, getCalciteMode } from "./cssUtils";
import { CalciteMode } from "src/enums/calcite";
import { Theme } from "src/enums";

describe("classes", () => {
  it("should return 'instant-apps-hydro-chart'", () => {
    const singleClass = classes("instant-apps-hydro-chart");
    expect(singleClass).toBe("instant-apps-hydro-chart");
  });

  it("should return 'instant-apps-hydro-chart calcite-mode-dark'", () => {
    const doubleClass = classes(
      "instant-apps-hydro-chart",
      "calcite-mode-dark"
    );
    expect(doubleClass).toBe("instant-apps-hydro-chart calcite-mode-dark");
  });

  it("should return an empty string", () => {
    const empty = classes();
    expect(empty).toBe("");
  });

  it("should return 'instant-apps-hydro-chart instant-apps-hydro-chart-splash instant-apps-hydro-chart--open calcite-mode-light'", () => {
    const quadClass = classes(
      "instant-apps-hydro-chart",
      "instant-apps-hydro-chart-splash",
      "instant-apps-hydro-chart--open",
      "calcite-mode-light"
    );
    expect(quadClass).toBe(
      "instant-apps-hydro-chart instant-apps-hydro-chart-splash instant-apps-hydro-chart--open calcite-mode-light"
    );
  });
});

describe("getCSSClass", () => {
  it("should return 'instant-apps-hydro-chart'", () => {
    const base = getCSSClass();
    expect(base, "instant-apps-hydro-chart").toBe("instant-apps-hydro-chart");
  });

  it("should return 'instant-apps-hydro-chart-splash'", () => {
    const name = getCSSClass({ name: "splash" });
    expect(name).toBe("instant-apps-hydro-chart-splash");
  });

  it("should return 'instant-apps-hydro-chart-splash__header-text'", () => {
    const desc = getCSSClass({ name: "splash", desc: "header-text" });
    expect(desc).toBe("instant-apps-hydro-chart-splash__header-text");
  });

  it("should return 'instant-apps-hydro-chart-splash__header-text--disabled'", () => {
    const mod = getCSSClass({
      name: "splash",
      desc: "header-text",
      mod: "disabled",
    });
    expect(mod).toBe("instant-apps-hydro-chart-splash__header-text--disabled");
  });

  it("should return an empty string: name, mod", () => {
    const name = "splash";
    const mod = getCSSClass({ name, mod: "disabled" });
    expect(mod).toBe("");
  });

  it("should return an empty string: desc, mod", () => {
    const mod = getCSSClass({ desc: "header-text", mod: "disabled" });
    expect(mod).toBe("");
  });

  it("should return an empty string: desc", () => {
    const mod = getCSSClass({ desc: "header-text" });
    expect(mod).toBe("");
  });

  it("should return an empty string: mod", () => {
    const mod = getCSSClass({ mod: "disabled" });
    expect(mod).toBe("");
  });
});

describe("getCalciteMode", () => {
  const light = Theme.Light;
  const dark = Theme.Dark;
  const calciteModeLight = CalciteMode.Light;
  const calciteModeDark = CalciteMode.Dark;
  it(`should be '${calciteModeLight}'`, () => {
    const calciteMode = getCalciteMode(light);
    expect(calciteMode).toBe(calciteModeLight);
  });

  it(`should be '${calciteModeDark}'`, () => {
    const calciteMode = getCalciteMode(dark);
    expect(calciteMode).toBe(calciteModeDark);
  });
});
