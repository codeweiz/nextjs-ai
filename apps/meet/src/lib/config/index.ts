import { AppConfig, useAppConfig } from "@microboat/common/config";
import appConfigJson from "../../../app-config.json";

export const appConfig = useAppConfig(appConfigJson as unknown as AppConfig);
