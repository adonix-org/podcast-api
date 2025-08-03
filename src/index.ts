/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { ContentType } from "./content-type";
import { SEAONS } from "./seasons";

export default {
    async fetch(request, env, ctx): Promise<Response> {
        if (request.method === "OPTIONS") {
            // Handle preflight OPTIONS request
            return getResponse(204, "", "text/plain");
        }

        if (request.method !== "GET") {
            return new Response("Method Not Allowed", { status: 405 });
        }

        const parameters = new URL(request.url);
        const season = parameters.searchParams.get("season");
        if (season) {
            
        }

        return getResponse(200, JSON.stringify(SEAONS));
    },
} satisfies ExportedHandler<Env>;

function getResponse(
    status: number,
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
