import { html, fixture, expect } from '@open-wc/testing';

import '../src/hydrofoil-paper-shell.js';

describe('<hydrofoil-paper-shell>', () => {
  it('has a default property heading', async () => {
    const el = await fixture('<hydrofoil-paper-shell></hydrofoil-paper-shell>');

    expect(el.heading).to.equal('Hello world!');
  });

  it('allows property heading to be overwritten', async () => {
    const el = await fixture(html`
      <hydrofoil-paper-shell heading="different heading"></hydrofoil-paper-shell>
    `);

    expect(el.heading).to.equal('different heading');
  });
});
