import { expect, fixture } from '@open-wc/testing'
import { html } from 'lit-html'
import sinon from 'sinon'
import { AlcaeusEntrypointMenu } from '../src/alcaeus-entrypoint-menu'

describe('<alcaeus-entrypoint-menu>', () => {
  it('does not include home link in menuItems', async () => {
    // given
    const entrypoint = {
      getLinks: sinon.stub().returns([]),
    }
    const element = await fixture<AlcaeusEntrypointMenu>(
      html`
        <alcaeus-entrypoint-menu .entrypoint="${entrypoint}"></alcaeus-entrypoint-menu>
      `,
    )

    // then
    expect(element.menuItems.length).to.equal(0)
  })

  it('add links to menuItems', async () => {
    // given
    const entrypoint = {
      getLinks: sinon.stub().returns([
        {
          supportedProperty: {
            title: 'Property 1',
          },
          resources: [{ id: 'http://property.one/' }],
        },
      ]),
    }
    const element = await fixture<AlcaeusEntrypointMenu>(
      html`
        <alcaeus-entrypoint-menu .entrypoint="${entrypoint}"></alcaeus-entrypoint-menu>
      `,
    )

    // then
    expect(element.menuItems.length).to.equal(1)
  })

  it('opens the menu when links are loaded', async () => {
    // given
    const entrypoint = {
      getLinks: sinon.stub().returns([
        {
          supportedProperty: {
            title: 'Property 1',
          },
          resources: [{ id: 'http://property.one/' }],
        },
      ]),
    }
    const element = await fixture<AlcaeusEntrypointMenu>(
      html`
        <alcaeus-entrypoint-menu .entrypoint="${entrypoint}"></alcaeus-entrypoint-menu>
      `,
    )

    // then
    expect(element.opened).to.be.true
  })
})
