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

const CONTENT_TYPE = {
    JSON: "application/json",
    HTML: "text/html",
    TEXT: "text/plain",
} as const;

export type ContentType = (typeof CONTENT_TYPE)[keyof typeof CONTENT_TYPE];

export const STATUS = {
    OK: 200,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
} as const;

export type StatusCode = (typeof STATUS)[keyof typeof STATUS];
