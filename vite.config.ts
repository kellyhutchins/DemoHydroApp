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

import { defineConfig, searchForWorkspaceRoot } from "vite";
import type { UserConfig as VitestUserConfigInterface } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

const vitestConfig: VitestUserConfigInterface = {
  test: {
    globals: true,
    includeSource: ["src/**/*.{js,ts}"],
    environment: "jsdom",
    deps: {
      inline: ["@esri/instant-apps-components"],
    },
    setupFiles: ["test/setup/setup.ts"],
  },
};

export default defineConfig({
  test: vitestConfig.test,
  plugins: [react(), tsconfigPaths()],
  base: "./",
  build: {
    outDir: "build",
  },
  server: {
    fs: {
      allow: [searchForWorkspaceRoot(process.cwd().replace("hydro-chart", ""))],
    },
    port: 3000,
  },
});
