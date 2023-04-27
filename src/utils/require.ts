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

//  * This is a small adaptor for apps using esri-loader's `loadModules` function in 4.x
//  * essentially we trick loadModules into thinking we have a dojo loader declared
//  * then we just provide modules from @arcgis/core
//  */
import Collection from '@arcgis/core/core/Collection';
import Handles from '@arcgis/core/core/Handles';
import * as reactiveUtils from '@arcgis/core/core/reactiveUtils';
import * as esriIntl from '@arcgis/core/intl';
import Point from '@arcgis/core/geometry/Point';
import SpatialReference from '@arcgis/core/geometry/SpatialReference';
import esriRequest from '@arcgis/core/request';

// @ts-ignore
window.require = function require(modulePaths: string[], cb) {
  const moduleMap = {
    'esri/core/Handles': Handles,
    'esri/core/reactiveUtils': reactiveUtils,
    'esri/intl': esriIntl,
    'esri/core/Collection': Collection,
    'esri/geometry/Point': Point,
    'esri/geometry/SpatialReference': SpatialReference,
    'esri/request': esriRequest,
  };
  const modules = modulePaths.map(name => {
    const module = moduleMap[name];
    if (!module) {
      console.error(`${name} not defined. Please add to utils/require.ts`);
    }
    return module;
  });
  cb.apply(null, modules);
};
// this has to be defined to fool esri-loader
// @ts-ignore
window.require.on = function () {
  return { remove: () => {} };
};
