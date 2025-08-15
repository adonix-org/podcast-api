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

import { PLAYLISTS } from "./seasons/playlists";
import {
    ErrorResult,
    JsonResult,
    StatusCodes,
    WorkerBase,
} from "@adonix.org/cf-worker-base";

const API_VERSION = "v1";
const API_PATH = `/api/${API_VERSION}/seasons`;

export class PodcastWorker extends WorkerBase {
    protected override async get(request: Request): Promise<Response> {
        const url = new URL(request.url);

        // "/api/v#/seasons"
        if (url.pathname === `${API_PATH}`) {
            return new JsonResult(this, Object.keys(PLAYLISTS)).response;
        }

        // "/api/v#/seasons/YYYY"
        const match = url.pathname.match(`^${API_PATH}/(\\d{4})$`);
        if (match) {
            const year = match[1];
            if (year in PLAYLISTS) {
                // Season present and valid
                return new JsonResult(this, PLAYLISTS[year]).response;
            }

            // Season present but invalid
            return new ErrorResult(
                this,
                StatusCodes.BAD_REQUEST,
                `Invalid season: ${year}`
            ).response;
        }

        return await this.env.ASSETS.fetch(request);
    }
}
