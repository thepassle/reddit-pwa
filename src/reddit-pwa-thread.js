import { LitElement, html, css } from 'lit-element';
import { StorageArea } from '/web_modules/kv-storage-polyfill.js';

import { hasChildren } from './utils.js';
import './reddit-pwa-comment.js';

const savedPosts = new StorageArea("saved-posts");

class RedditPwaThread extends LitElement {
  static get properties() {
    return {
      comments: { type: Array },
      originalPost: { type: Object },
      title: { type: String },
      thread: { type: Object },
      url: { type: String },
      isPostSaved: { type: Boolean }
    }
  }

  constructor() {
    super();
    this.comments = [];
    this.title = '';
    this.url = '';
  }

  async connectedCallback() {
    await super.connectedCallback();
    this.isPostSaved = typeof await savedPosts.get(this.location.params.id) !== 'undefined';

    if(this.location.getUrl().split('/')[1] === "offline") {
      this.thread = await savedPosts.get(this.location.params.id);

      this.originalPost = this.thread[0].data.children[0].data;
      this.comments = this.thread[1].data.children;
      this.title = this.thread[0].data.children[0].data.title;
    } else {
      this.fetchPost();
    }
  }

  async fetchPost() {
    this.url = `https://www.reddit.com/r/${this.location.params.subreddit}/comments/${this.location.params.id}/${this.location.params.title}.json`;
    this.thread = await fetch(this.url).then(res => res.json());

    this.originalPost = this.thread[0].data.children[0].data;
    this.comments = this.thread[1].data.children;
    this.title = this.thread[0].data.children[0].data.title;
  }

  async saveForOffline() {
    await savedPosts.set(this.location.params.id, this.thread);
    this.isPostSaved = true;
  }

  async deleteFromStorage() {
    await savedPosts.delete(this.location.params.id);
    this.isPostSaved = false;
  }

  static get styles() {
    return css`
    `
  }

  render() {
    if(!this.thread) return html``;
    return html`
      <a href="/${this.location.params.subreddit}">Back</a>
      <h1>${this.title}</h1>
      ${this.isPostSaved
          ? html`<button class="delete" @click=${this.deleteFromStorage}>❌ Delete from storage</button>`
          : html`<button class="save" @click=${this.saveForOffline}>💾 Save for offline</button>`
      }
      ${this.comments.map(comment => html`
        ${hasChildren(comment)
          ? html`<reddit-pwa-comment
              .author=${comment.data.author}
              .depth=${comment.data.depth}
              .body=${comment.data.body}
              .replies=${comment.data.replies.data.children}>
            </reddit-pwa-comment>`
          : ''
        }
      `)}
    `;
  }
}

customElements.define('reddit-pwa-thread', RedditPwaThread);
