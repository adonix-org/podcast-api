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
import { SEASON_LIST, SEASON_NUMBERS } from "./seasons/seasons";

export default {
    async fetch(request, env, ctx): Promise<Response> {
        if (request.method === "OPTIONS") {
            // Handle preflight OPTIONS request
            return getResponse(STATUS.OK, "", "text/plain");
        }

        if (request.method !== "GET") {
            return new Response("Method Not Allowed", {
                status: STATUS.NO_CONTENT,
            });
        }

        const parameters = new URL(request.url);
        const season = parameters.searchParams.get("season");
        if (season) {
            const num = parseInt(season, 10);
            if (!SEASON_NUMBERS.includes(num)) {
                return getResponse(
                    STATUS.BAD_REQUEST,
                    `Invalid season: ${season}`,
                    "text/plain"
                );
            }
        }

        return getResponse(STATUS.OK, JSON.stringify(SEASON_LIST));
    },
} satisfies ExportedHandler<Env>;

function getResponse(
    status: StatusCode,
    body: string,
    contentType: ContentType = "application/json"
): Response {
    JSON.stringify(body);
    const bodyBytes = new TextEncoder().encode(body); // avoids double-encoding
    const headers = new Headers({
        "Content-Type": contentType,
        "Content-Length": bodyBytes.length.toString(),
        "Cache-Control": "public, max-age=86400, immutable",
        "X-Content-Type-Options": "nosniff",
    });

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
