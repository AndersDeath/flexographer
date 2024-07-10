import { indexController } from "./index.controller";
import { builderLogsClearController } from "./builderLogsClear.controller";
import { builderRunController } from "./builderRun.controller";
import { builderLogsController } from "./builderLogs.controller";
import { clearEverythingController } from "./clearEverything.controller";
import { builderApiController } from "./api/builderApi.controller";
import { builderApiGetLogsController } from "./api/builderApiGetLogs.controller";
import { builderApiRunController } from "./api/builderApiRun.controller";
import { builderApiClearEverythingController } from "./api/builderApiClearEverything.controller";
import { builderApiGetCategoriesController } from "./api/builderApiGetCategories.controller";
import { builderApiGetTargetsController } from "./api/builderApiGetTargets.controller";
import { Controller } from "../models/controller.model";

export {
  indexController,
  builderLogsController,
  builderRunController,
  builderLogsClearController,
  clearEverythingController,
  builderApiController,
  builderApiGetLogsController,
  builderApiRunController,
  builderApiClearEverythingController,
  builderApiGetCategoriesController,
  builderApiGetTargetsController
};

export const Controllers: Controller[] = [
  indexController,
  builderLogsClearController,
  builderRunController,
  builderLogsController,
  clearEverythingController,
  builderApiController,
  builderApiGetLogsController,
  builderApiRunController,
  builderApiClearEverythingController,
  builderApiGetCategoriesController,
  builderApiGetTargetsController
];