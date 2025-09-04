/*
 * Copyright (C) 2025 Ty Busby
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
    BadRequest,
    CacheControl,
    CacheHandler,
    CorsHandler,
    JsonResponse,
    Method,
    NotFound,
    RouteParams,
    RouteWorker,
    Time,
} from "@adonix.org/cloud-spark";

const API_VERSION = "v1";
const API_PATH = `/api/${API_VERSION}/seasons`;
const LATEST_SEASON = "2025";

// for older seasons
const LONG_CACHE: CacheControl = {
    public: true,
    immutable: true,
    "max-age": Time.Year,
    "s-maxage": 90 * Time.Day,
};

// for current season
const DAY_CACHE: CacheControl = {
    public: true,
    "max-age": Time.Day,
    "s-maxage": Time.Day,
    "stale-while-revalidate": Time.Day,
};

export class PodcastWorker extends RouteWorker {
    protected override init(): void {
        this.load([
            [Method.GET, API_PATH, this.getPodcast],
            [Method.GET, `${API_PATH}/:year`, this.getSeason],
        ]);

        this.use(new CorsHandler());
        this.use(new CacheHandler());
    }

    private async getPodcast(): Promise<Response> {
        const json = await this.getJson("seasons/index.json");
        if (json) return this.getResponse(JsonResponse, json, DAY_CACHE);

        return this.getResponse(NotFound, "index.json was not found.");
    }

    private async getSeason(params: RouteParams): Promise<Response> {
        const year = params["year"];
        if (!/^\d{4}$/.test(year)) {
            return this.getResponse(
                BadRequest,
                `Invalid season ${year}. Expected format: YYYY`
            );
        }

        const json = await this.getJson(`seasons/${year}.json`);
        if (json) {
            return this.getResponse(
                JsonResponse,
                json,
                year === LATEST_SEASON ? DAY_CACHE : LONG_CACHE
            );
        }

        // Correctly formatted season (YYYY) was present in URL
        // but was not found in R2
        return this.getResponse(NotFound, `Season ${year} was not found.`);
    }

    private async getJson(key: string): Promise<unknown> {
        const object = await this.env.R2_PODCAST.get(key);
        if (!object) return null;

        try {
            return await object.json();
        } catch (cause) {
            throw new Error(`Failed to parse JSON for key: ${key}`, { cause });
        }
    }
}
