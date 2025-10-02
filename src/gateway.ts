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

import { cache, cors, GET, RouteWorker, stripSearchParams } from "@adonix.org/cloud-spark";
import * as v1 from "./api/v1";
import { Media } from "./media";

export class GatewayWorker extends RouteWorker {
    protected override init(): void {
        this.routes([v1.Podcast.route, v1.Seasons.route]);

        this.route(GET, "/audio/:filename", Media);
        this.route(GET, "/artwork/:filename", Media);

        this.use(cache(undefined, stripSearchParams));
        this.use(cors({ allowedHeaders: [] }));
    }
}
