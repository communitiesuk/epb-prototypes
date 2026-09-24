//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//

window.GOVUKPrototypeKit.documentReady(() => {
  // Add JavaScript here
})

// Wraps the copy to clipboard button
// Must have a `target` attribute with the id of the element to copy
// Must contain a button with the following markup:
//
// <epb-copy-to-clipboard target="element-id">
//   <button type="button" class="govuk-button govuk-button--secondary">
//     <slot name="action-message">
//       <svg ... />
//       Copy
//     </slot>
//     <slot name="success-message" hidden>
//       <svg ... />
//       Copied
//     </slot>
//   </button>
// </epb-copy-to-clipboard>
//
//
class CopyToClipboardElement extends HTMLElement {
  connectedCallback() {
    this.querySelector('button')?.addEventListener('click', this.#onClick);
  }

  disconnectedCallback() {
    this.querySelector('button')?.removeEventListener('click', this.#onClick);
  }

  get target() {
    const element = this.ownerDocument.getElementById(this.getAttribute('target'));
    if (!element) {
      console.warn(`missing target element for`, this);
    }
    return element;
  }

  #onClick = async (e) => {
    if (e.defaultPrevented) {
      return;
    }
    try {
      await navigator.clipboard.writeText(this.target?.innerText?.trim());
    } catch(e) {
      // Ignore copy errors
      console.error(e);
      return;
    }
    this.#setSlotHidden('action-message', true);
    this.#setSlotHidden('success-message', false);
  }

  #setSlotHidden(name, state) {
    const element = this.querySelector(`slot[name="${name}"]`);
    if (!element) {
      console.warn(`missing slot ${name}`, this);
      return;
    }
    element.hidden = state;
  }
}

customElements.define("epb-copy-to-clipboard", CopyToClipboardElement);
