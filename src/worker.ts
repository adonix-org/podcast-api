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

import { PLAYLISTS } from "./seasons/seasons";
import { MimeType, StatusCodes, WorkerBase } from "@adonix.org/cf-worker-base";

const API_VERSION = "v1";
const API_PATH = `/api/${API_VERSION}/seasons`;

export class PodcastWorker extends WorkerBase {
    protected override async get(request: Request): Promise<Response> {
        const url = new URL(request.url);

        // redirect if the path ends with a slash
        if (url.pathname.length > 1 && url.pathname.endsWith("/")) {
            const noSlash = url.pathname.slice(0, -1);
            const newUrl = `${url.origin}${noSlash}${url.search}`;
            return Response.redirect(newUrl, StatusCodes.PERMANENT_REDIRECT);
        }

        // "/api/v#/seasons"
        if (url.pathname === `${API_PATH}`) {
            return this.getResponse(
                StatusCodes.OK,
                JSON.stringify(Object.keys(PLAYLISTS))
            );
        }

        // "/api/v#/seasons/YYYY"
        const match = url.pathname.match(`^${API_PATH}/(\\d{4})$`);
        if (match) {
            const year = match[1];
            if (year in PLAYLISTS) {
                // Season present and valid
                return this.getResponse(
                    StatusCodes.OK,
                    JSON.stringify(PLAYLISTS[year])
                );
            }

            // Season present but invalid
            return this.getResponse(
                StatusCodes.BAD_REQUEST,
                this.getError(
                    StatusCodes.BAD_REQUEST,
                    `Invalid season: ${year}`
                )
            );
        }

        return await this.env.ASSETS.fetch(url);
    }
}
