/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

import type Calendar from './Calendar';
import { OptionDataValueDate } from '../../util/types';

export default function calendarPrepareCustom(coordSys: Calendar) {
    const rect = coordSys.getRect();
    const rangeInfo = coordSys.getRangeInfo();

    return {
        coordSys: {
            type: 'calendar',
            x: rect.x,
            y: rect.y,
            width: rect.width,
            height: rect.height,
            cellWidth: coordSys.getCellWidth(),
            cellHeight: coordSys.getCellHeight(),
            rangeInfo: {
                start: rangeInfo.start,
                end: rangeInfo.end,
                weeks: rangeInfo.weeks,
                dayCount: rangeInfo.allDay
            }
        },
        api: {
            coord: function (
                data: Parameters<Calendar['dataToPoint']>[0],
                clamp?: Parameters<Calendar['dataToPoint']>[1]
            ): ReturnType<Calendar['dataToPoint']> {
                return coordSys.dataToPoint(data, clamp);
            },
            layout: function (
                data: Parameters<Calendar['dataToLayout']>[0],
                clamp?: Parameters<Calendar['dataToLayout']>[1]
            ): ReturnType<Calendar['dataToLayout']> {
                return coordSys.dataToLayout(data, clamp);
            }
        }
    };
}
