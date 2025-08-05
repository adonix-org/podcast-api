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
import { playlist as playlist_2007 } from "./2007";
import { playlist as playlist_2008 } from "./2008";
import { playlist as playlist_2009 } from "./2009";
import { playlist as playlist_2010 } from "./2010";
import { playlist as playlist_2011 } from "./2011";
import { playlist as playlist_2012 } from "./2012";
import { playlist as playlist_2013 } from "./2013";
import { playlist as playlist_2014 } from "./2014";
import { playlist as playlist_2015 } from "./2015";
import { playlist as playlist_2016 } from "./2016";
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

export const PLAYLISTS: Record<string, MetaData[]> = {
    "2007": playlist_2007,
    "2008": playlist_2008,
    "2009": playlist_2009,
    "2010": playlist_2010,
    "2011": playlist_2011,
    "2012": playlist_2012,
    "2013": playlist_2013,
    "2014": playlist_2014,
    "2015": playlist_2015,
    "2016": playlist_2016,
    "2017": playlist_2017,
    "2018": playlist_2018,
    "2019": playlist_2019,
    "2020": playlist_2020,
    "2021": playlist_2021,
    "2022": playlist_2022,
    "2023": playlist_2023,
    "2024": playlist_2024,
    "2025": playlist_2025,
};

export const SEASON_NUMBERS = [
    2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018,
    2019, 2020, 2021, 2022, 2023, 2024, 2025,
];

export const SEASON_LIST: string[] = SEASON_NUMBERS.map(String);
