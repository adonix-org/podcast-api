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

import { RouteWorker } from "@adonix.org/cloud-spark";

export class R2Worker extends RouteWorker {
    protected async getJson(key: string): Promise<unknown> {
        const object = await this.env.R2_PODCAST.get(key);
        if (!object) return null;

        try {
            return await object.json();
        } catch (cause) {
            throw new Error(`Failed to parse JSON for key: ${key}`, { cause });
        }
    }
}
