import {html, LitElement, property} from '@polymer/lit-element'
import {ifDefined} from 'lit-html/directives/if-defined'
import {repeat} from 'lit-html/directives/repeat'

import 'paper-collapse-item/paper-collapse-group'

export default abstract class HydrofoilMultiResourceView<TModel> extends LitElement {
    @property({ type: Object, attribute: false })
    public root: TModel

    @property({ type: Array, attribute: false })
    public displayedResources: TModel[] = []

    @property({ type: Object, attribute: false })
    public current: TModel

    public updated(props) {
        super.updated(props)
        if (props.has('root')) {
            this.displayedResources = [ this.root ]
            this.current = this.root
        }
    }

    public connectedCallback() {
        super.connectedCallback()
        this.addEventListener('hydrofoil-append-resource', (e: CustomEvent) => {
            const indexOfParent = this.displayedResources.findIndex((res) => this.areSame(res, e.detail.parent))
            const remaining = this.displayedResources.slice(0, indexOfParent + 1)
            this.displayedResources = [ ...remaining, e.detail.resource ]
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
<paper-collapse-item header="${this.getHeader(model)}"
                     icon="${ifDefined(this.getIcon(model))}"
                     ?opened="${this.areSame(model, this.current)}">
    <div slot="header">
        ${this.areSame(model, this.root) ? '' : html`<paper-button @click="${this.close(model)}">Close</paper-button>`}
    </div>

    ${this.renderModel(model)}
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
    protected abstract getHeader(model: TModel)

    private close(removed: TModel) {
        return (e: Event) => {
            const indexOfRemoved = this.displayedResources.findIndex((res) => this.areSame(res, removed))

            this.displayedResources = this.displayedResources.slice(0, indexOfRemoved)
            if (this.displayedResources.length > 0) {
                this.current = this.displayedResources[this.displayedResources.length - 1]
            }

            e.stopPropagation()
            e.preventDefault()
        }
    }
}
