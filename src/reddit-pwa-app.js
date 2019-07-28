import { LitElement, html } from 'lit-element';
import { Router } from '@vaadin/router';

class RedditPwaApp extends LitElement {
  firstUpdated() {
    const router = new Router(this.shadowRoot.getElementById('outlet'));

    router.setRoutes([
      {
        path: '/',
        component: 'reddit-pwa-search',
        action: () => { import('./reddit-pwa-search.js');}
      },
      {
        path: '/:subreddit',
        component: 'reddit-pwa-subreddit',
        action: () => { import('./reddit-pwa-subreddit.js');}
      },
      {
        path: '/:subreddit/:id/:title',
        component: 'reddit-pwa-thread',
        action: () => { import('./reddit-pwa-thread.js');}
      },
      {
        path: '/offline/:subreddit/:id/:title',
        component: 'reddit-pwa-thread',
        action: () => {
          import('./reddit-pwa-thread.js');
        }
      }
    ]);
  }

  render() { // eslint-disable-line
    return html`
      <div id="outlet"></div>
    `;
  }
}

customElements.define('reddit-pwa-app', RedditPwaApp);
