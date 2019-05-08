import HydrofoilMultiResourceView from '@hydrofoil/hydrofoil-shell/hydrofoil-multi-resource-view'
import { HydraResource } from 'alcaeus/types/Resources'
import { html } from 'lit-html'
import { ifDefined } from 'lit-html/directives/if-defined'
import { repeat } from 'lit-html/directives/repeat'

import '@polymer/paper-icon-button/paper-icon-button'
import 'paper-collapse-item/paper-collapse-group'

/**
 * An implementation of `<hydrofoil-multi-resource-view>` in the form of an accordion which always displays a single
 * item.
 *
 * @customElement
 */
export default class HydrofoilResourceAccordion extends HydrofoilMultiResourceView {
    /**
     * Compares `left` and `right` by comparing their identifiers
     *
     * @param left {HydraResource}
     * @param right {HydraResource}
     */
    protected areSame (left: HydraResource, right: HydraResource) {
        return left && right && left.id === right.id
    }

    /**
     * Implement in a derived element class to return icon name to be used for the `model`'s `<paper-item>`
     *
     * @param model {HydraResource}
     * @type {string}
     */
    protected getIcon (model: HydraResource) {
        return undefined
    }

    /**
     * @returns {TemplateResult}
     */
    protected renderAll () {
        const renderPanel = (model) => html`
<paper-collapse-item header="${this.getHeader(model)}"
                     icon="${ifDefined(this.getIcon(model))}"
                     ?opened="${this.areSame(model, this.current)}">
    <div slot="header">
        ${this.areSame(model, this.root)
            ? ''
            : html`<paper-icon-button icon="close" @click="${this.close(model)}"></paper-icon-button>`}
    </div>

    ${this.renderModel(model)}
</paper-collapse-item>`

        return html`

<custom-style>
    <style>
        paper-icon-button {
            cursor: pointer
        }

        :host {
          --paper-collapse-item-header: {
           border: solid 1px black;
          }
    </style>
</custom-style>

<paper-collapse-group>${repeat(this.displayedResources, renderPanel)}</paper-collapse-group>`
    }
}

customElements.define('hydrofoil-resource-accordion', HydrofoilResourceAccordion)
