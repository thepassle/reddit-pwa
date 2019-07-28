import { LitElement, html, css } from 'lit-element';
import { StorageArea } from 'std:kv-storage';
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
      <div class="search-container">
        <label for="search">Find subreddit</label>
        <input @input=${this.updateSubreddit} id="search" type="text" value="${this.subreddit}"/>
        <a href="${this.subreddit}">🔎 Search!</a>
      </div>
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
      .search-container {
        padding-top: 20vh;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .search-container a {
        background-color: #0077ff;
        color: white;
        padding: 0px 10px;
        height: 40px;
        line-height: 40px;
        text-decoration: none;
        border-radius: 5px;
      }

      .search-container a:hover,
      .search-container a:active,
      .search-container a:focus {
        text-decoration: underline;
      }

      a {
        color: #0077ff;
      }

      input {
        box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.3);
        margin: 10px 0px;
        font-size: 1em;
        width: 80%;
        height: 40px;
        border-radius: 10px;
        border: none;
        padding: 0px 10px;
      }

      input:active, input:focus, input:hover {
        transition: box-shadow 0.3s ease-in-out;
        box-shadow: 0px 3px 10px 0px rgba(0,0,0,0.5);
      }
    `;
  }
}

customElements.define('reddit-pwa-search', RedditPwaSearch);
