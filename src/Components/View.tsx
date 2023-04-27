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

import { useContext, useEffect, useRef } from "react";
import { ViewContext } from "src/Context/Contexts";
import MapView from "@arcgis/core/views/MapView";

const View = () => {
  const view = useContext(ViewContext) as MapView;
  const viewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!view || !viewRef?.current) return;
    view.container = viewRef?.current as HTMLDivElement;
  }, [view, viewRef?.current]);

  return <div ref={viewRef} id="viewDiv" />;
};

export default View;
