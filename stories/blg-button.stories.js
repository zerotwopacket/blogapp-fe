import { html } from 'lit';
import '../src/common/blg-button.js';
import { fn } from '@storybook/test';

export const ActionsData = {
  onClickBtn: fn(),
}

export default {
  title: 'Da Button',
  component: 'blg-button',
  excludeStories: /.*Data$/,
  args: {
    ...ActionsData
  }
};

export const Primary = {
  render: (args) => html`<blg-button
    .blgText=${args.text}
    .disabled=${args.disabled}
    @btn-clicked="${args.onClickBtn}"
  ></blg-button>`,
  args: {
    text: 'La butones',
    disabled: false
  }
}

export const Disabled = {
  render: (args) => html`<blg-button
    .blgText=${args.text}
    .disabled=${args.disabled}
    @btn-clicked="${args.onClickBtn}"
  ></blg-button>`,
  args: {
    text: 'A La butones',
    disabled: true
  }
}

