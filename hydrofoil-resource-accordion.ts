import {customElement, html} from '@polymer/lit-element'
import {HydraResource} from 'alcaeus/types/Resources'
import {ifDefined} from 'lit-html/directives/if-defined'
import {repeat} from 'lit-html/directives/repeat'
import HydrofoilMultiResourceView from './hydrofoil-multi-resource-view'

@customElement('hydrofoil-resource-accordion')
export default class HydrofoilResourceAccordion extends HydrofoilMultiResourceView {
    protected areSame(left: HydraResource, right: HydraResource) {
        return left && right && left.id === right.id
    }

    protected getIcon(model: HydraResource) {
        return undefined
    }

    protected renderAll() {
        const renderPanel = (model) => html`
<paper-collapse-item header="${this.getHeader(model)}"
                     icon="${ifDefined(this.getIcon(model))}"
                     ?opened="${this.areSame(model, this.current)}">
    <div slot="header">
        ${this.areSame(model, this.root) ? '' : html`<paper-button @click="${this.close(model)}">Close</paper-button>`}
    </div>

    ${this.renderModel(model)}
</paper-collapse-item>`

        return html`

<custom-style>
    <style>
        paper-button {
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
