import {customElement, html} from '@polymer/lit-element'
import {HydraResource} from 'alcaeus/types/Resources'
import HydrofoilMultiResourceView from './hydrofoil-multi-resource-view'

@customElement('hydrofoil-resource-accordion')
export default class HydrofoilResourceAccordion extends HydrofoilMultiResourceView<HydraResource> {
    protected areSame(left: HydraResource, right: HydraResource) {
        return left && right && left.id === right.id
    }

    protected renderHeader(model: HydraResource) {
        return html`${model.id}`
    }
}
