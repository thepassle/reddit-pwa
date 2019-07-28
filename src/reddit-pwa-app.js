import { LitElement, html, css } from 'lit-element';
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
      <a aria-label="Home" href="/">🏠</a>
    `;
  }

  static get styles() {
    return css`
      #outlet {
        display: block;
        width: calc(100% - 20px);
        height: calc(100% - 20px);
        padding: 10px;
        overflow: scroll;
        -webkit-overflow-scrolling: touch;
      }

      a {
        text-decoration: none;
        box-shadow: 0px 3px 10px 0px rgba(0,0,0,0.5);
        position: fixed;
        background-color: #9b00ff;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        bottom: 20px;
        left: 20px;
      }
    `;
  }
}

customElements.define('reddit-pwa-app', RedditPwaApp);
