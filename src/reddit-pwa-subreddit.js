import { LitElement, html, css } from 'lit-element';
import { formatTitle } from './utils.js';

class RedditPwaSubreddit extends LitElement {
  static get properties() {
    return {
      subreddit: { type: String },
      posts: { type: Array }
    }
  }

  async connectedCallback() {
    super.connectedCallback();
    this.subreddit = this.location.params.subreddit;

    this.posts = await fetch(`https://www.reddit.com/r/${this.subreddit}.json`)
      .then(res => res.json())
      .then(res => res.data.children);
  }

  render() {
    return !this.posts
      ? html``
      : html`
      <a href="/">Back</a>
      <ul>
        ${this.posts.map(post => html`
          <li>
            <h2><a href="/${post.data.subreddit}/${post.data.id}/${formatTitle(post.data.url)}">${post.data.title}</a></h2>
            <span>⬆️${post.data.ups}, by: ${post.data.author}</span>
          </li>
        `)}
      </ul>
    `
  }

  static get styles() {
    return css`
    `;
  }
}

customElements.define('reddit-pwa-subreddit', RedditPwaSubreddit);
