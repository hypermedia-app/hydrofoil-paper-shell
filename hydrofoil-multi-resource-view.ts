import {html, LitElement, property} from '@polymer/lit-element'
import {ifDefined} from 'lit-html/directives/if-defined'
import {repeat} from 'lit-html/directives/repeat'

import 'paper-collapse-item/paper-collapse-group'

export default abstract class HydrofoilMultiResourceView<TModel> extends LitElement {
    static get properties() {
        return {
            root: { type: Object, noAccessors: true, attribute: false },
        }
    }

    public get root() {
        return this.displayedResources[0]
    }

    public set root(newValue: TModel) {
        const oldValue = this.root
        this.displayedResources = [ newValue ]
        this.current = newValue
        this.requestUpdate('root', oldValue)
    }

    @property({ type: Array, attribute: false })
    public displayedResources: TModel[] = []

    @property({ type: Object, attribute: false })
    public current: TModel

    public connectedCallback() {
        super.connectedCallback()
        this.addEventListener('hydrofoil-append-resource', (e: CustomEvent) => {
            const indexOfParent = this.displayedResources.findIndex((res) => this.areSame(res, e.detail.parent))
            const remaining = this.displayedResources.slice(0, indexOfParent + 1)
            this.displayedResources = [ ...remaining, e.detail.resource]
            this.current = e.detail.resource
        })

        this.addEventListener('hydrofoil-close-resource', (e: CustomEvent) => {
            this.close(e.detail.resource)
        })
    }

    public render() {
        if (this.displayedResources.length === 1) {
            return this.renderModel(this.displayedResources[0])
        }

        const renderPanel = (model) => html`
<paper-collapse-item icon="${ifDefined(this.getIcon(model))}" ?opened="${this.areSame(model, this.current)}">
    <div slot="header">
        ${this.renderHeader(model)} <button @click="${this.close(model)}">Close</button>
    </div>

    ${this.renderModel}
</paper-collapse-item>`

        return html`<paper-collapse-group>${repeat(this.displayedResources, renderPanel)}</paper-collapse-group>`
    }

    protected renderModel(model: TModel) {
        return html`<lit-view .value="${model}" ignore-missing template-scope="hydrofoil-multi-resource"></lit-view>`
    }

    protected getIcon(model: TModel) {
        return undefined
    }

    protected abstract areSame(left: TModel, right: TModel)
    protected abstract renderHeader(model: TModel)

    private close(removed: TModel) {
        const indexOfRemoved = this.displayedResources.findIndex((res) => this.areSame(res, removed))

        this.displayedResources = this.displayedResources.slice(0, indexOfRemoved)
        if (this.displayedResources.length > 0) {
            this.current = this.displayedResources[this.displayedResources.length - 1]
        }
    }
}
