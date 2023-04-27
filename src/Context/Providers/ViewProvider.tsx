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

import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";
import { useEffect, useState } from "react";

import { ViewContext } from "src/Context/Contexts";

interface ConfigurationSettingsProviderProps {
  map: WebMap;
  children: React.ReactElement;
}

const ViewProvider = ({
  children,
  map
}: ConfigurationSettingsProviderProps) => {
  const [view, setView] = useState<MapView | null>(null);

  useEffect(() => {
    const ui = { components: [] };
    const config = { map, ui };
    const view = new MapView(config);
    setView(view);
  }, [map]);

  return <ViewContext.Provider value={view}>{children}</ViewContext.Provider>;
};

export default ViewProvider;
