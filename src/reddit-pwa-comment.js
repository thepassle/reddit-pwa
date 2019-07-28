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
        :host([depth~="5"]) {margin-left: 100px;}
        :host([depth~="6"]) {margin-left: 120px;}
        :host([depth~="7"]) {margin-left: 140px;}
        :host([depth~="8"]) {margin-left: 160px;}
        :host([depth~="9"]) {margin-left: 180px;}
      `,
    ];
  }

  render() {
    return html`
      <h2>
        ${this.author}
      </h2>
      <div>${this.body}</div>

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
