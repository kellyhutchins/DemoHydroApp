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

import Portal from "@arcgis/core/portal/Portal";

import { ThemeContext } from "src/Context/Contexts";
import { ISharedTheme } from "src/types/interfaces";

interface ThemeProviderProps {
  portal: Portal;
  children: React.ReactElement;
}

const ThemeProvider = ({ children, portal }: ThemeProviderProps) => {
  const sharedThemeFromPortal = portal?.portalProperties?.sharedTheme;
  const sharedTheme = {
    themes: {
      primary: {
        type: "primary",
        ...sharedThemeFromPortal?.header
      },
      secondary: {
        type: "secondary",
        ...sharedThemeFromPortal?.body
      },
      accent: {
        type: "accent",
        ...sharedThemeFromPortal?.button
      }
    },
    logo: sharedThemeFromPortal?.logo?.small,
    logoLink: sharedThemeFromPortal?.logo?.link
  } as ISharedTheme;

  return (
    <ThemeContext.Provider
      value={{
        sharedTheme,
        token: portal.get("credential.token") as string
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
