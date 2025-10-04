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
    NotFound,
    PathParams,
    R2ObjectStream,
    RouteTuple,
    RouteWorker,
} from "@adonix.org/cloud-spark";
import { LATEST_SEASON, DAY_CACHE, LONG_CACHE, ROOT } from "./constants";

export class Seasons extends RouteWorker {
    private static readonly path = `${ROOT}/seasons/:year`;
    public static readonly route: RouteTuple = [GET, Seasons.path, Seasons];

    protected override init(): void {
        this.route(GET, Seasons.path, this.getSeason);
    }

    private async getSeason(params: PathParams): Promise<Response> {
        const year = params["year"];
        if (!/^\d{4}$/.test(year)) {
            return this.response(BadRequest, `Invalid season ${year}. Expected format: YYYY`);
        }

        const season = await this.env.R2_AUDIO.get(`seasons/${year}.json`);
        if (season) {
            return this.response(
                R2ObjectStream,
                season,
                year === LATEST_SEASON ? DAY_CACHE : LONG_CACHE
            );
        }

        // Correctly formatted season (YYYY) was present in URL
        // but was not found in R2
        return this.response(NotFound, `Season ${year} was not found.`);
    }
}
