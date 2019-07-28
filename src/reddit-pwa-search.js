import { LitElement, html, css } from 'lit-element';
import { StorageArea } from '/web_modules/kv-storage-polyfill.js';
import { getAllPosts, formatTitle } from './utils.js';

class RedditPwaSearch extends LitElement {
  static get properties() {
    return {
      subreddit: { type: String },
      savedPosts: { type: Array }
    }
  }

  constructor() {
    super();
    this.subreddit = 'askreddit';
    this.savedPosts = [];
  }

  async connectedCallback() {
    super.connectedCallback();
    this.savedPosts = await getAllPosts(new StorageArea('saved-posts').values());
  }

  updateSubreddit() {
    this.subreddit = `/${this.shadowRoot.querySelector('input').value}`;
  }

  render() {
    return html`
      <label for="search">Find subreddit</label>
      <input @input=${this.updateSubreddit} id="search" type="text" value="${this.subreddit}"/>
      <a href="${this.subreddit}">🔎 Search!</a>
      ${this.savedPosts.length > 0
        ? html`<p>Saved posts:</p>
          <ul>
            ${this.savedPosts.map(post => html`
              <li>
                <a href="/offline/${post[0].data.children[0].data.subreddit}/${post[0].data.children[0].data.id}/${formatTitle(post[0].data.children[0].data.url)}">
                  ${post[0].data.children[0].data.title}
                </a>
              </li>
            `)}
          </ul>
        `
        : html`<p>No saved posts.</p>`
      }
    `
  }

  static get styles() {
    return css`
    `;
  }
}

customElements.define('reddit-pwa-search', RedditPwaSearch);
