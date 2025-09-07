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
    Method,
    JsonResponse,
    NotFound,
    PathParams,
    BadRequest,
} from "@adonix.org/cloud-spark";
import { R2Worker } from "../../r2-worker";
import { DAY_CACHE, LATEST_SEASON, LONG_CACHE } from "../../constants";

export const API_PATH = "/api/v1/seasons{/:year}";

export class PodcastWorker extends R2Worker {
    protected override init(): void {
        this.load([
            [Method.GET, "/api/v1/seasons", this.getPodcast],
            [Method.GET, "/api/v1/seasons/:year", this.getSeason],
        ]);
    }

    private async getPodcast(): Promise<Response> {
        const json = await this.getJson("seasons/index.json");
        if (json) return this.getResponse(JsonResponse, json, DAY_CACHE);

        return this.getResponse(NotFound, "index.json was not found.");
    }

    private async getSeason(params: PathParams): Promise<Response> {
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
}
