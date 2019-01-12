import {MENUS} from "../../config/menu";
import {ICMenu} from "../IClient";
import * as React from "react";
import {Menu} from "antd";
import router from "umi/router";

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
export default class CMenu {
    private constructor() {
    }

    private static instance: CMenu;

    static getInstance(): CMenu {
        if (!CMenu.instance) {
            CMenu.instance = new CMenu();
        }

        return CMenu.instance;
    }

    onSelect(view, {key}) {
        const target: ICMenu = this.getItemWithKey(key);
        console.log(target, key)

        if (target) {
            const {path} = target;
            router.push(path);
        }
    }

    getItemWithKey(key) {
        const menus = this.reallyMenus;
        let target: ICMenu;
        for (let i = 0; i < menus.length; i++) {
            target = this.getItem(menus[i], key);

            if (target) {
                break;
            }
        }

        return target;
    }

    getItem(item: ICMenu, key) {
        if (key === item.key) {
            return item;
        }

        const {children} = item;
        let target: ICMenu;

        if (children) {
            for (let i = 0; i < children.length; i++) {
                target = this.getItem(children[i], key);

                if (target) {
                    break;
                }
            }
        }

        return target;
    }

    onOpen(view, openKeys: string[]) {
        openKeys = openKeys.length > 1 ? [openKeys[openKeys.length - 1]] : openKeys;
        view.setState({openKeys});
    }

    renderItem(item: ICMenu) {
        const {name, children, key} = item;

        if (children && children.length) {
            return (
                <SubMenu title={name}>
                    {
                        children.map((it: ICMenu) => {
                            return this.renderItem(it)
                        })
                    }
                </SubMenu>
            )
        } else {
            return (
                <MenuItem key={key}>{item.name}</MenuItem>
            )
        }
    }

    reallyMenus: ICMenu[];

    renderMenu(view) {
        if (!this.reallyMenus) {
            this.reallyMenus = this.addKeys();
        }

        const menus: ICMenu[] = this.reallyMenus;
        const openKeys = view.state.openKeys || [];

        return (
            <Menu
                mode="inline"
                openKeys={openKeys}
                onOpenChange={this.onOpen.bind(this, view)}
                onSelect={this.onSelect.bind(this, view)}
            >
                {
                    menus.map((item: ICMenu, _) => {
                        return this.renderItem(item);
                    })
                }
            </Menu>
        )
    }

    addKeys() {
        MENUS.map((item: ICMenu, _) => {
            this.addKey(item, _ + "");
        });

        return MENUS;
    }

    addKey(item, key) {
        const {children} = item;
        item.key = key;

        if (children) {
            children.map((it: ICMenu, _) => {
                const subkey = [key, _].join(",");
                this.addKey(it, subkey);
            })
        }
    }
}
