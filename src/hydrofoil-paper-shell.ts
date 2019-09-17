import { HydrofoilShell } from '@hydrofoil/hydrofoil-shell/hydrofoil-shell'
import { AppDrawerElement } from '@polymer/app-layout/app-drawer/app-drawer'
import { css, customElement, html, property, query } from 'lit-element'

import '@polymer/app-layout/app-layout'
import '@polymer/iron-icon/iron-icon'
import '@polymer/iron-icons/iron-icons'
import '@polymer/paper-icon-button/paper-icon-button'
import '@polymer/paper-item/paper-item'
import './loading-overlay'

/**
 * An extension of `<hydrofoil-shell>` with Material Design UI
 *
 * The UI elements include:
 *
 * * Center pane wrapped in a `app-header-layout`
 * * Left `<app-drawer>` with a `app-header-layout`
 * * Right `<app-drawer>`, plain
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
  @property({ type: String })
  public title = 'Hydrofoil Paper Shell'

  @property({ type: String, attribute: 'left-drawer-title' })
  public leftDrawerTitle = ''

  @query('#rightDrawer')
  private rightDrawer: AppDrawerElement | null = null

  @query('#leftDrawer')
  private leftDrawer: AppDrawerElement | null = null

  public static get styles() {
    return [
      super.styles,
      css`
        :host {
          --app-drawer-width: 350px;
        }

        app-drawer-layout[narrow] {
          --open-menu-icon-display: block;
        }

        paper-icon-button[icon='menu'] {
          display: var(--open-menu-icon-display, none);
        }

        app-toolbar,
        ::slotted(app-toolbar) {
          background: var(--paper-blue-400);
          color: white;
          @apply (--paper-font-common-base);
        }

        side-menu {
          height: calc(100% - 128px);
          overflow: auto;
        }
      `,
    ]
  }

  /**
   * Opens the right drawer
   */
  public openRightDrawer() {
    if (this.rightDrawer) {
      this.rightDrawer.open()
    }
  }

  /**
   * Opens the left drawer
   */
  public openLeftDrawer() {
    if (this.leftDrawer) {
      this.leftDrawer.open()
    }
  }

  public render() {
    return html`
      <app-drawer-layout>
        <app-drawer slot="drawer" swipe-open id="leftDrawer">
          <app-toolbar class="medium-tall">
            <div class="title">
              <slot name="left-drawer-title">
                ${this.leftDrawerTitle}
              </slot>
            </div>
          </app-toolbar>

          <slot name="drawer-left"></slot>
        </app-drawer>

        <app-drawer align="end" slot="drawer" swipe-open id="rightDrawer">
          <slot name="drawer-right"></slot>
        </app-drawer>

        <app-header-layout>
          <app-header slot="header" fixed>
            <app-toolbar>
              <paper-icon-button icon="menu" @click="${this.openLeftDrawer}"></paper-icon-button>
              <div main-title>
                <slot name="toolbar-title">
                  ${this.title}
                </slot>
              </div>

              <slot name="toolbar-main"></slot>
            </app-toolbar>

            <slot name="header"></slot>
          </app-header>

          ${super.render()}

          <loading-overlay ?opened="${this.isLoading}">
            <slot name="loader"></slot>
          </loading-overlay>
        </app-header-layout>
      </app-drawer-layout>
    `
  }
}
