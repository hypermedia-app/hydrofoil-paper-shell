import {IronPagesElement} from '@polymer/iron-pages/iron-pages'
import {customElement, html, query} from '@polymer/lit-element'
import {repeat} from 'lit-html/directives/repeat'
import HydrofoilMultiResourceView from './hydrofoil-multi-resource-view'

import '@polymer/paper-icon-button/paper-icon-button'
import '@polymer/paper-tabs/paper-tabs'

@customElement('hydrofoil-resource-tabs')
export default class HydrofoilResourceTabs extends HydrofoilMultiResourceView {
    @query('iron-pages')
    public pages: IronPagesElement

    protected areSame(left, right) {
        return left && right && left.id === right.id
    }

    protected renderAll() {
        const renderTab = (res) =>
            html`<paper-tab>${this.getHeader(res)}
                 ${this.areSame(res, this.root)
                        ? ''
                        : html`<paper-icon-button icon="close" @click="${this.close(res)}"></paper-icon-button>`}
                 </paper-tab>`

        return html`
<paper-tabs @selected-changed="${this.selectPage}" .selected="${this.displayedResources.lastIndexOf(this.current)}">
    ${repeat(this.displayedResources, renderTab)}
</paper-tabs>

<iron-pages .selected="${this.displayedResources.lastIndexOf(this.current)}">
    ${repeat(this.displayedResources, (res) => html`<div>${this.renderModel(res)}</div>`)}
</iron-pages>`
    }

    private selectPage(e: CustomEvent) {
        this.pages.select(e.detail.value)
    }
}
