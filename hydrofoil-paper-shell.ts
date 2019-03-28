import {HydrofoilShell} from '@hydrofoil/hydrofoil-shell/hydrofoil-shell'
import {AppDrawerElement} from '@polymer/app-layout/app-drawer/app-drawer'
import {customElement, html, query} from 'lit-element'

import '@polymer/app-layout/app-layout'
import '@polymer/iron-icon/iron-icon'
import '@polymer/iron-icons/iron-icons'
import '@polymer/iron-pages/iron-pages'
import '@polymer/paper-item/paper-item'
import './loading-overlay'

/**
 * An extension of `<hydrofoil-shell>` with Material Design UI
 *
 * The UI elements include:
 *
 * * Center pane wrapped in a `app-header-layout`
 * * Left `<app-drawer>` with a `app-header-layout`
 * * Right `<aoo-drawer>`, plain
 * * A full-screen loading overlay which is displayed when a resource is being loaded
 *
 * The static UI parts can be extended through a number of slots, whose names should be self-explanatory:
 *
 * * `drawer-left`
 * * `drawer-right`
 * * `toolbar-main`
 * * `header`
 * * `shell-ready`
 * * `loader`
 *
 * @customElement
 */
@customElement('hydrofoil-paper-shell')
export class HydrofoilPaperShell extends HydrofoilShell {
    @query('#rightDrawer')
    private rightDrawer: AppDrawerElement

    @query('#leftDrawer')
    private leftDrawer: AppDrawerElement

    public get _style() {
        return html`
            ${super._style}
            <style>
                :host {
                    --app-drawer-width: 350px;
                }

                app-toolbar, ::slotted(app-toolbar) {
                    background: var(--paper-blue-400);
                    color: white;
                    @apply(--paper-font-common-base);
                }

                side-menu {
                    height: calc(100% - 128px);
                    overflow: auto;
                }
            </style>`
    }

    /**
     * Opens the right drawer
     */
    public openRightDrawer() {
        this.rightDrawer.open()
    }

    /**
     * Opens the left drawer
     */
    public openLeftDrawer() {
        this.leftDrawer.open()
    }

    public renderMain() {
        return html`<app-drawer-layout>
        <app-drawer slot="drawer" swipe-open id="leftDrawer">
            <app-toolbar class="medium-tall">
                <div class="title">Options</div>
            </app-toolbar>

            <slot name="drawer-left"></slot>
        </app-drawer>

        <app-drawer align="end" slot="drawer" swipe-open id="rightDrawer">
            <slot name="drawer-right"></slot>
        </app-drawer>

        <app-header-layout>
            <app-header slot="header" fixed>
                <app-toolbar>
                    <div main-title>
                        Hydra Console
                    </div>

                    <slot name="toolbar-main"></slot>
                </app-toolbar>

                <slot name="header"></slot>
            </app-header>

            <iron-pages attr-for-selected="data-state" selected="${this.state}">
                <div data-state="ready">
                    <slot name="shell-ready"></slot>
                </div>

                <div data-state="loaded">
                    ${super.renderMain()}
                </div>

                <div data-state="error">
                    An error occurred:
                    <p>${this.lastError ? this.lastError.message : ''}</p>
                    <p>${this.lastError ? this.lastError.stack : ''}</p>
                </div>
            </iron-pages>

            <loading-overlay ?opened="${this.isLoading}">
                <slot name="loader"></slot>
            </loading-overlay>
        </app-header-layout>
    </app-drawer-layout>`
    }

}
