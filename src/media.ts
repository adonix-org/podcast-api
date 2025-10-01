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

import { GET, NotFound, PathParams, R2ObjectStream, RouteWorker } from "@adonix.org/cloud-spark";
import { LONG_CACHE } from "./api/v1/constants";

export class Media extends RouteWorker {
    protected override init(): void {
        this.route(GET, "/audio/:filename", this.getAudio);
        this.route(GET, "/artwork/:filename", this.getArtwork);
    }

    private async getAudio(params: PathParams): Promise<Response> {
        const filename = params["filename"];
        return this.getMedia(filename);
    }

    private async getArtwork(params: PathParams): Promise<Response> {
        const filename = params["filename"];
        return this.getMedia(`artwork/${filename}`);
    }

    private async getMedia(key: string): Promise<Response> {
        const stream = await this.env.R2_AUDIO.get(key, { range: this.request.headers });
        if (!stream) {
            return this.response(NotFound, `${key} not found.`);
        }

        return this.response(R2ObjectStream, stream, LONG_CACHE);
    }
}
