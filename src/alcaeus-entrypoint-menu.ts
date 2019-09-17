import { customElement, html, LitElement, property, css } from 'lit-element'
import { repeat } from 'lit-html/directives/repeat'
import { HydraResource } from 'alcaeus/types/Resources'
import fireNavigation from 'ld-navigation/fireNavigation'

import '@polymer/paper-item'
import '@polymer/paper-listbox'
import '@polymer/polymer/lib/elements/dom-repeat'
import 'paper-collapse-item/paper-collapse-item'

/**
 * Material design menu which renders links from Hydra's entrypoint.
 *
 * Implemented with Polymer 3 using a collapsible `<paper-listbox>`.
 *
 * The menu renders a static link to the entrypoint itself so that it's always possible to navigate to the API's home.
 *
 * @customElement
 */
@customElement('alcaeus-entrypoint-menu')
export class AlcaeusEntrypointMenu extends LitElement {
  /**
   * The API entrypoint resource previously loaded from the API Documentation
   *
   * @type {HydraResource}
   */
  @property({ type: Object })
  public entrypoint: HydraResource | null = null

  /**
   * Controls the state of the collapsible panel which wraps the menu.
   *
   * @type {Boolean}
   */
  @property({ type: Boolean })
  public opened = false

  /**
   * The entrypoint link's label
   *
   * @type {String}
   */
  @property({ type: String })
  public homeLabel = 'Home'

  /**
   * The links retrieved from the entrypoint resource.
   *
   * Note that only properties typed as `hydra:Link` will be considered.
   *
   * @type {Array}
   */
  get menuItems() {
    if (!this.entrypoint) {
      return []
    }

    return this.entrypoint.getLinks(false).reduce(
      (links, tuple) => [
        ...links,
        ...tuple.resources.map(resource => ({
          label: tuple.supportedProperty.title,
          url: resource.id,
        })),
      ],
      [] as ({ label: string; url: string })[],
    )
  }

  protected updated(_changedProperties: Map<PropertyKey, unknown>): void {
    if (_changedProperties.has('entrypoint')) {
      this.opened = true
    }
  }

  private loadEntrypoint() {
    if (this.entrypoint) {
      fireNavigation(this, this.entrypoint.id)
    }
  }

  private load(e: any) {
    fireNavigation(this, e.model.item.url)
  }

  public static get styles() {
    return css`
      :host {
        display: block;
      }

      paper-item,
      paper-collapse-item {
        cursor: pointer;
      }
    `
  }

  public render() {
    return html`
      <paper-collapse-item header="Main menu" ?opened="${this.opened}">
        <paper-listbox>
          <paper-item @click="${this.loadEntrypoint}">${this.homeLabel}</paper-item>
          ${repeat(
            this.menuItems,
            item => html`
              <paper-item @click="${this.load}">${item.label}</paper-item>
            `,
          )}
          </dom-repeat>
        </paper-listbox>
      </paper-collapse-item>
    `
  }
}
