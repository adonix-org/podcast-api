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

import { BasicWorker, JsonResponse, NotFound } from "@adonix.org/cloud-spark";
import { getJson } from "./utils";
import { DAY_CACHE, ROOT } from "./constants";

export class Podcast extends BasicWorker {
    public static readonly PATH = `${ROOT}/seasons`;

    public override async get(): Promise<Response> {
        const json = await getJson(this.env, "seasons/index.json");
        if (json) return this.response(JsonResponse, json, DAY_CACHE);

        return this.response(NotFound, "index.json was not found.");
    }
}
