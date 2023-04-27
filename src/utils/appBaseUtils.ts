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

import PortalItem from "@arcgis/core/portal/PortalItem";
import { ConfigState } from "src/types/interfaces";

const DEFAULT_TITLE = "Hydro Chart";

export function getAppTitle(config: ConfigState, item: PortalItem): string {
  const configTitle = config?.title;
  const itemTitle = item?.title;
  return configTitle ? configTitle : itemTitle ? itemTitle : DEFAULT_TITLE;
}
