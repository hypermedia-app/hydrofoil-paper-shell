import { expect, fixture } from '@open-wc/testing'
import { html } from 'lit-html'
import * as sinon from 'sinon'
import '../alcaeus-entrypoint-menu'

describe('<alcaeus-entrypoint-menu>', () => {
  it('renders home link where there is nothing else', async () => {
    // given
    const entrypoint = {
      getLinks: sinon.stub().returns([]),
    }
    const element = await fixture(html`<alcaeus-entrypoint-menu .entrypoint="${entrypoint}"></alcaeus-entrypoint-menu>`)

    // then
    expect(element).shadowDom.to.equalSnapshot()
  })

  it('lists links as menu items', async () => {
    // given
    const entrypoint = {
      getLinks: sinon.stub().returns([{
        supportedProperty: {
          title: 'Property 1',
        },
        resources: [{ id: 'http://property.one/' }],
      }]),
    }
    const element = await fixture(html`<alcaeus-entrypoint-menu .entrypoint="${entrypoint}"></alcaeus-entrypoint-menu>`)

    // then
    expect(element).shadowDom.to.equalSnapshot()
  })
})
