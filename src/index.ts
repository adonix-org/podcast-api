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

import { ContentType, STATUS, StatusCode } from "./http-constants";
import { PLAYLISTS, SEASON_LIST, SEASON_NUMBERS } from "./seasons/seasons";

const API_VERSION = "v1";
const BASE_PATH = `/api/${API_VERSION}`;

export default {
    async fetch(request): Promise<Response> {
        if (request.method === "OPTIONS") {
            // Handle preflight OPTIONS request
            return getResponse(STATUS.NO_CONTENT);
        }

        if (request.method !== "GET") {
            return getResponse(
                STATUS.METHOD_NOT_ALLOWED,
                getError("Method not allowed")
            );
        }

        // favicon.ico - return no content
        const url = new URL(request.url);
        if (url.pathname === "/favicon.ico") {
            return getResponse(STATUS.NO_CONTENT);
        }

        // redirect if the path ends with a slash
        if (url.pathname.length > 1 && url.pathname.endsWith("/")) {
            const noSlash = url.pathname.slice(0, -1);
            const newUrl = `${url.origin}${noSlash}${url.search}`;
            return Response.redirect(newUrl, 308);
        }

        // "/api/v#/seasons/YYYY"
        const match = url.pathname.match(`^${BASE_PATH}/seasons/(\\d{4})$`);
        if (match) {
            const season = match[1];
            const year = parseInt(season, 10);
            if (!SEASON_NUMBERS.includes(year)) {
                // Season present but invalid
                return getResponse(
                    STATUS.BAD_REQUEST,
                    getError(`Invalid season ${season}`)
                );
            }

            const playlist = PLAYLISTS[season];
            if (playlist) {
                // Season present and valid
                return getResponse(STATUS.OK, JSON.stringify(playlist));
            }

            // Season present, valid but missing playlist
            return getResponse(
                STATUS.SERVER_ERROR,
                getError(
                    `Unable to resolve playlist for valid season ${season}`
                )
            );
        }

        // "/api/v#/seasons"
        if (url.pathname === `${BASE_PATH}/seasons`) {
            return getResponse(STATUS.OK, JSON.stringify(SEASON_LIST));
        }

        return getResponse(STATUS.NOT_FOUND, getError("Not Found"));
    },
} satisfies ExportedHandler<Env>;

function getResponse(
    status: StatusCode,
    body: string | null = null,
    contentType: ContentType = "application/json"
): Response {
    const headers = new Headers({
        "Cache-Control": "public, max-age=86400, immutable",
        "X-Content-Type-Options": "nosniff",
    });

    if (body) {
        const bodyBytes = new TextEncoder().encode(body);
        headers.set("Content-Type", contentType);
        headers.set("Content-Length", bodyBytes.length.toString());
    }

    return new Response(body, {
        status,
        headers: addCorsHeaders(headers),
    });
}

function addCorsHeaders(headers: Headers): Headers {
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Headers", "Content-Type");
    headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    return headers;
}

function getError(message: string) {
    return JSON.stringify({ error: message });
}
