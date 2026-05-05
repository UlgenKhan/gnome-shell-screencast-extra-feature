/* partbase.js
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

import St from 'gi://St';

import * as PopupMenu from 'resource:///org/gnome/shell/ui/popupMenu.js';


/**
 * A base class for part of this extension.
 */
export class PartBase {
    /**
     * Function for teardown.
     */
    destroy() {
    }
}

/**
 * A base class for popup selection.
 *
 * @template T Type of selectable item.
 */
export class PartOptionSelect extends PartBase {
    /**
     * Construct part with screenshot UI and items.
     *
     * @param {PopupMenu.PopupMenuBase} optionMenu option menu to attach this menu.
     * @param {string} title Title of the item.
     * @param {T[]} items a list of selectable items.
     * @param {T} selectedItem Initially selected item.
     */
    constructor(optionMenu, title, items, selectedItem) {
        super();
        this._optionMenu = optionMenu;
        this._selectedItem = selectedItem;

        let label = `${title}: ${this.makeLabel(this._selectedItem)}`;
        this._submenuMenuItem = new PopupMenu.PopupSubMenuMenuItem(label, true);

        this._optionMenu.addMenuItem(this._submenuMenuItem);

        for (let item of items) {
            let label = this.makeLabel(item);
            let titleLabel = `${title}: ${label}`;
            this._submenuMenuItem.menu.addAction (
                label,
                () => {
                    this._selectedItem = item;
                    this._submenuMenuItem.label.text = titleLabel;
                }
            )
        }
    }

    /** @override */
    destroy() {
        if (this._submenuMenuItem) {
            this._submenuMenuItem.destroy();
            this._submenuMenuItem = null;
        }

        this._submenuMenuItem = null;
        this._selectedItem = null;

        super.destroy();
    }

    /**
     * Make label from the item.
     *
     * @abstract
     * @param {T} item Item to label.
     * @returns {string} The label for the item.
     */
    makeLabel(item) {
        throw new Error("Not Implemented");
    }

    /**
     * Get selected item.
     *
     * @returns {T} selected item.
     */
    get selectedItem () {
        return this._selectedItem;
    }
}
