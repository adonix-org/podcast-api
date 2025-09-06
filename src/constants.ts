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

import { CacheControl, Time } from "@adonix.org/cloud-spark";

export const LATEST_SEASON = "2025";

// for older seasons
export const LONG_CACHE: CacheControl = {
    public: true,
    immutable: true,
    "max-age": Time.Year,
    "s-maxage": 90 * Time.Day,
};

// for current season
export const DAY_CACHE: CacheControl = {
    public: true,
    "max-age": Time.Day,
    "s-maxage": Time.Day,
    "stale-while-revalidate": Time.Day,
};
