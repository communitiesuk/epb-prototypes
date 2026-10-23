//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//

window.GOVUKPrototypeKit.documentReady(() => {
  // Add JavaScript here
});

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
  #blurTimeout;
  #copied = false;

  connectedCallback() {
    if (!navigator.clipboard) {
      this.hidden = true;
      return;
    }
    const button = this.#button;
    button?.addEventListener('click', this.#onClick);
    button?.addEventListener('blur', this.#onBlur);
    button?.addEventListener('focus', this.#onFocus);
  }

  disconnectedCallback() {
    const button = this.#button;
    button?.removeEventListener('click', this.#onClick);
    button?.removeEventListener('blur', this.#onBlur);
    button?.removeEventListener('focus', this.#onFocus);
    clearTimeout(this.#blurTimeout);
  }

  get target() {
    const element = this.ownerDocument.getElementById(
      this.getAttribute('target'),
    );
    if (!element) {
      console.warn(`missing target element for`, this);
    }
    return element;
  }

  get #button() {
    return this.querySelector('button');
  }

  #onClick = async (e) => {
    if (e.defaultPrevented) {
      return;
    }
    clearTimeout(this.#blurTimeout);
    try {
      await navigator.clipboard.writeText(this.target?.innerText?.trim());
    } catch (e) {
      // Ignore copy errors
      console.error(e);
      return;
    }
    this.#setSlotHidden('action-message', true);
    this.#setSlotHidden('success-message', false);
    this.#copied = true;
  };

  #onBlur = async () => {
    clearTimeout(this.#blurTimeout);
    if (!this.#copied) {
      return;
    }
    this.#blurTimeout = setTimeout(() => {
      this.#reset();
    }, 2000);
  };

  #onFocus = async () => {
    this.#reset();
  };

  #reset() {
    clearTimeout(this.#blurTimeout);
    this.#setSlotHidden('action-message', false);
    this.#setSlotHidden('success-message', true);
    this.#copied = false;
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

customElements.define('epb-copy-to-clipboard', CopyToClipboardElement);
