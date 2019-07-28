import { LitElement, html, css } from 'lit-element';
import { hasChildren } from './utils.js';

class RedditPwaComment extends LitElement {
  static get properties() {
    return {
      depth: { type: Number, reflect: true },
      body: { type: String },
      replies: { type: Array },
      author: { type: String }
    };
  }

  static get styles() {
    return [
      css`
        :host {display: block;}
        :host([depth~="0"]) {margin-left: 0px;}
        :host([depth~="1"]) {margin-left: 20px;}
        :host([depth~="2"]) {margin-left: 40px;}
        :host([depth~="3"]) {margin-left: 60px;}
        :host([depth~="4"]) {margin-left: 80px;}

        h2 {
          word-break: break-word;
          font-size: 1em;
          font-weight: 600;
          margin-bottom: 0.5em;
        }

        p {
          word-break: break-word;
          font-weight: 300;
          margin-top: 0;
        }
      `,
    ];
  }

  render() {
    return html`
      <h2>
        ${this.author}:
      </h2>
      <p>${this.body}</p>

      ${this.replies.map(comment => html`
        ${hasChildren(comment)
          ? html`
              <reddit-pwa-comment
                .author=${comment.data.author}
                .depth=${comment.data.depth}
                .body=${comment.data.body}
                .replies=${comment.data.replies.data.children}>
              </reddit-pwa-comment>`
          : ''
        }`)
      }
    `;
  }
}

customElements.define('reddit-pwa-comment', RedditPwaComment);
