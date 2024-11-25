import { html } from 'lit';
import '../src/blog-app.js';

export default {
  title: 'BlogApp',
  component: 'blog-app',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

function Template({ header, backgroundColor }) {
  return html`
    <blog-app
      style="--blog-app-background-color: ${backgroundColor || 'white'}"
      .header=${header}
    >
    </blog-app>
  `;
}

export const App = Template.bind({});
App.args = {
  header: 'My app',
};
