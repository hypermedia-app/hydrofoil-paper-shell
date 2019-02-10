import {computed, customElement, observe, property} from '@polymer/decorators'
import {html, PolymerElement} from '@polymer/polymer'
import {animationFrame} from '@polymer/polymer/lib/utils/async'
import {Debouncer} from '@polymer/polymer/lib/utils/debounce'
import {HydraResource} from 'alcaeus/types/Resources'
import fireNavigation from 'ld-navigation/fireNavigation'

import '@polymer/paper-item'
import '@polymer/paper-listbox'
import '@polymer/polymer/lib/elements/dom-repeat'
import 'paper-collapse-item/paper-collapse-item'

@customElement('alcaeus-entrypoint-menu')
export default class extends PolymerElement {
    @property({ type: Object })
    public resource: HydraResource

    @property({ type: Object })
    public readonly entrypoint: HydraResource

    @property({ type: Boolean })
    public opened: boolean = false

    @property({ type: String })
    public homeLabel: string = 'Home'

    @computed('entrypoint')
    get links() {
        return this.entrypoint.apiDocumentation
            .getProperties(this.entrypoint.types[0])
            .filter((sp) => {
                return sp.property.types.contains('http://www.w3.org/ns/hydra/core#Link')
            })
    }

    @observe('links')
    private openWhenLoaded(newLinks, oldLinks) {
        Debouncer.debounce(null, animationFrame, () => {
            if (!oldLinks) {
                this.opened = true
            }
        })
    }

    private loadEntrypoint() {
        fireNavigation(this, this.entrypoint.id)
    }

    private load(e: any) {
        fireNavigation(this, this.entrypoint[e.model.link.property.id].id)
    }

    static get template() {
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
        <dom-repeat items="[[links]]" as="link">
            <template>
                <paper-item on-tap="load">[[link.title]]</paper-item>
            </template>
        </dom-repeat>
    </paper-listbox>
</paper-collapse-item>`
    }
}
