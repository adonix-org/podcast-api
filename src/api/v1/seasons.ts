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
    GET,
    JsonResponse,
    NotFound,
    PathParams,
    RouteWorker,
} from "@adonix.org/cloud-spark";
import { LATEST_SEASON, DAY_CACHE, LONG_CACHE, ROOT } from "./constants";
import { getJson } from "./utils";

export class Seasons extends RouteWorker {
    public static readonly PATH = `${ROOT}/seasons/:year`;

    protected override init(): void {
        this.route(GET, Seasons.PATH, this.getSeason);
    }

    private async getSeason(params: PathParams): Promise<Response> {
        const year = params["year"];
        if (!/^\d{4}$/.test(year)) {
            return this.response(BadRequest, `Invalid season ${year}. Expected format: YYYY`);
        }

        const json = await getJson(this.env, `seasons/${year}.json`);
        if (json) {
            return this.response(
                JsonResponse,
                json,
                year === LATEST_SEASON ? DAY_CACHE : LONG_CACHE
            );
        }

        // Correctly formatted season (YYYY) was present in URL
        // but was not found in R2
        return this.response(NotFound, `Season ${year} was not found.`);
    }
}
