import { computed, customElement, observe, property } from '@polymer/decorators'
import { html, PolymerElement } from '@polymer/polymer'
import { animationFrame } from '@polymer/polymer/lib/utils/async'
import { Debouncer } from '@polymer/polymer/lib/utils/debounce'
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
export default class extends PolymerElement {
    /**
     * The API entrypoint resource previously loaded from the API Documentation
     *
     * @type {HydraResource}
     */
    @property({ type: Object })
    public entrypoint: HydraResource

    /**
     * Controls the state of the collapsible panel which wraps the menu.
     *
     * @type {Boolean}
     */
    @property({ type: Boolean })
    public opened: boolean = false

    /**
     * The entrypoint link's label
     *
     * @type {String}
     */
    @property({ type: String })
    public homeLabel: string = 'Home'

    /**
     * The links retrieved from the entrypoint resource.
     *
     * Note that only properties typed as `hydra:Link` will be considered.
     *
     * @type {Array}
     */
    @computed('entrypoint')
    get menuItems () {
        const items = []

        for (let tuple of this.entrypoint.getLinks(false)) {
            for (let resource of tuple.resources) {
                items.push({
                    label: tuple.supportedProperty.title,
                    url: resource.id,
                })
            }
        }

        return items
    }

    @observe('menuItems')
    private openWhenLoaded (newLinks, oldLinks) {
        Debouncer.debounce(null, animationFrame, () => {
            if (!oldLinks) {
                this.opened = true
            }
        })
    }

    private loadEntrypoint () {
        fireNavigation(this, this.entrypoint.id)
    }

    private load (e: any) {
        fireNavigation(this, e.model.item.url)
    }

    public static get template () {
        return html`
<style>
    :host { display: block }

    paper-item, paper-collapse-item {
        cursor: pointer;
    }
</style>

<paper-collapse-item header="Main menu" opened="{{opened}}">
    <paper-listbox>
        <paper-item on-tap="loadEntrypoint">[[homeLabel]]</paper-item>
        <dom-repeat items="[[menuItems]]" as="item">
            <template>
                <paper-item on-click="load">[[item.label]]</paper-item>
            </template>
        </dom-repeat>
    </paper-listbox>
</paper-collapse-item>`
    }
}
