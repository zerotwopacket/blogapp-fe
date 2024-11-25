import { html } from 'lit';

import '../src/common/blg-nav.js';

export default {
  title: 'Top nav',
  component: 'blg-nav'
}


export const Nav = {
  render: (args) => html`<blg-nav
    .links=${args.links}
    .currentLink=${args.currentLink}
  ></blg-nav>`,
  args: {
    links: ['Test1', 'Test2'],
    currentLink: 'Test2'
  }
}
