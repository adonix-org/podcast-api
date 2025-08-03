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

import { playlist as playlist_2017 } from "./2017";
import { playlist as playlist_2018 } from "./2018";
import { playlist as playlist_2019 } from "./2019";
import { playlist as playlist_2020 } from "./2020";
import { playlist as playlist_2021 } from "./2021";
import { playlist as playlist_2022 } from "./2022";
import { playlist as playlist_2023 } from "./2023";
import { playlist as playlist_2024 } from "./2024";
import { playlist as playlist_2025 } from "./2025";
import { MetaData } from "./metadata";

export const PLAYLISTS: Record<string, Playlist> = {
    "2017": { playlist: playlist_2017 },
    "2018": { playlist: playlist_2018 },
    "2019": { playlist: playlist_2019 },
    "2020": { playlist: playlist_2020 },
    "2021": { playlist: playlist_2021 },
    "2022": { playlist: playlist_2022 },
    "2023": { playlist: playlist_2023 },
    "2024": { playlist: playlist_2024 },
    "2025": { playlist: playlist_2025 },
};

export const SEASON_NUMBERS = [
    2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025,
];

export const SEASON_LIST: Seasons = {
    seasons: SEASON_NUMBERS.map(String),
};

interface Playlist {
    playlist: MetaData[];
}

interface Seasons {
    seasons: string[];
}
