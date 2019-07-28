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
      <h1>${this.location.params.subreddit}</h1>
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
      h1 {
        font-size: 1.5em;
        font-weight: 600;
        text-transform: lowercase;
        font-weight: 100;
        margin-bottom: 2em;
        color: #6b6b6b;
        text-decoration: underline;
        text-decoration-color: rgb(0, 119, 255);
      }

      a {
        color: #0077ff;
      }

      ul {
        list-style: none;
        padding-left: 0;
      }

      h2 {
        margin-top: 1.5em;
        margin-bottom: 0.25em;
        font-size: 1em;
        font-weight: 400;
      }

      span {
        font-size: 0.75em;
      }
    `;
  }
}

customElements.define('reddit-pwa-subreddit', RedditPwaSubreddit);
