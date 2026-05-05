/* partpref.js
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

import Gio from "gi://Gio";
import St from "gi://St";

import {gettext} from 'resource:///org/gnome/shell/extensions/extension.js';

import * as PartBase from "./partbase.js";

/**
 * Adds A button for preferences.
 */
export class PartPref extends PartBase.PartBase {
    constructor(screenshotUI, optionMenu, extension) {
        super();
        this.screenshotUI = screenshotUI;
        this.extension = extension;

        let iconsDir = extension.dir.get_child("icons");

        this._optionMenu = optionMenu;
        this._item = this._optionMenu.addAction(
            gettext("Screencast extra feature preferences"),
            () => {
                this.screenshotUI.close();
                this.extension.openPreferences();
            },
            new Gio.FileIcon({
                file: iconsDir.get_child("settings-symbolic.svg")
            })
        );
    }

    /** @override */
    destroy() {
        if (this._optionMenu) {
            if (this._item) {
                this._item.destroy();
                this._item = null;
            }
            this._optionMenu = null;
        }

        this.extension = null;
        this.screenshotUI = null;
        super.destroy();
    }
}
