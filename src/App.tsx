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

import "src/App.scss";

import Header from "src/Components/Header";
import ViewProvider from "src/Context/Providers/ViewProvider";
import View from "src/Components/View";
import Splash from "src/Components/Splash/Splash";
import { CalciteMode, Theme } from "src/enums/calcite";
import { useContext } from "react";
import { ConfigurationSettingsContext } from "src/Context/Contexts";
import { IConfigurationSettingsContext } from "src/types/interfaces";
import { classes } from "src/utils/cssUtils";
import ThemeProvider from "./Context/Providers/ThemeProvider";
import Portal from "@arcgis/core/portal/Portal";
import WebMap from "@arcgis/core/WebMap";

interface AppProps {
  map: WebMap;
  portal: Portal;
}

const BASE_CLASS = "instant-apps-hydro-chart";

function App({ map, portal }: AppProps) {
  const { theme } = useContext(
    ConfigurationSettingsContext
  ) as IConfigurationSettingsContext;

  const calciteMode =
    theme === Theme.Light ? CalciteMode.Light : CalciteMode.Dark;

  return (
    <ViewProvider map={map}>
      <ThemeProvider portal={portal}>
        <div className={classes(BASE_CLASS, calciteMode)}>
          <Header />
          <View />

          <Splash />
        </div>
      </ThemeProvider>
    </ViewProvider>
  );
}

export default App;
