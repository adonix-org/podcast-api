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
    BadRequest,
    JsonResponse,
    NotFound,
    WorkerBase,
} from "@adonix.org/cf-worker-base";

const API_VERSION = "v1";
const API_PATH = `/api/${API_VERSION}/seasons`;

export class PodcastWorker extends WorkerBase {
    protected override async get(): Promise<Response> {
        const url = new URL(this.request.url);

        // "/api/v#/seasons"
        if (url.pathname === `${API_PATH}`) {
            return this.getResponse(JsonResponse, Object.keys(PLAYLISTS));
        }

        // "/api/v#/seasons/YYYY"
        const match = url.pathname.match(`^${API_PATH}/(\\d{4})$`);
        if (match) {
            const year = match[1];
            if (year in PLAYLISTS) {
                // Season present and valid
                return this.getResponse(JsonResponse, PLAYLISTS[year]);
            }

            // Season present but invalid
            return this.getResponse(BadRequest, `Invalid season: ${year}`);
        }

        return this.getResponse(NotFound);
    }

    public override getAllowOrigins(): string[] {
        return ["https://www.tybusby.com", "http://localhost:5173"];
    }
}
