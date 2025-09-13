import {DrizzleD1Database, drizzle} from "drizzle-orm/d1";
import {getCloudflareContext} from "@opennextjs/cloudflare";

import * as schema from './schema'

// 数据库连接单例
let dbInstance: DrizzleD1Database<typeof schema> | null = null;

// 单例获取数据库连接
export const getDbInstance = async () => {
    if (dbInstance) {
        // 单例
        return dbInstance;
    }

    const {env} = await getCloudflareContext({async: true});

    if (!env.NEXT_TAG_CACHE_D1) {
        throw new Error("找不到 D1 数据库")
    }

    dbInstance = drizzle(env.NEXT_TAG_CACHE_D1, {schema, logger: true})

    return dbInstance;
}
