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

import { HydroChartCSS } from "src/enums";
import { CalciteMode } from "src/enums/calcite";
import { Theme } from "src/enums";

export function classes(...args: string[]): string {
  return args.length > 0 ? args.join(" ") : "";
}

export function getCSSClass(obj?: {
  name?: string;
  desc?: string;
  mod?: string;
}): string {
  if (!obj) return HydroChartCSS.BASE;
  const { name, desc, mod } = obj;
  const base = HydroChartCSS.BASE;
  const className = mod
    ? `${base}-${name}__${desc}--${mod}`
    : desc
    ? `${base}-${name}__${desc}`
    : name
    ? `${base}-${name}`
    : "";
  const isValid = className.indexOf("undefined") === -1;
  return isValid ? className : "";
}

export function getCalciteMode(
  theme: Theme.Light | Theme.Dark
): CalciteMode.Light | CalciteMode.Dark {
  const isLight = theme === Theme.Light;
  const { Light, Dark } = CalciteMode;
  return isLight ? Light : Dark;
}
