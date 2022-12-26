/**
 * View
 * ------------------------------------------------------------------------------
 * The parent class.
 *
 */
export default class View {
  _data;
  _errorMessage = '';
  _successMessage = '';

  /**
   * Render markup
   * @param {Object} data
   * @param {Boolean} clear - determines whether to clear parent element before rendering
   */
  render(data, clear = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (clear) this.clear();

    this._parentEl.insertAdjacentHTML('beforeend', markup);
  }

  /**
   * Render error message
   * @param {String} message - message to display
   */
  renderError(message = this._errorMessage) {
    const markup = `
      <div class="message message--error" js-message="message">
        <p>${message}</p>
      </div>
    `;

    this.clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   * Render success message
   * @param {String} message - message to display
   */
  renderSuccess(message = this._successMessage) {
    const markup = `
      <div class="message" js-message="message">
        <p>${message}</p>
      </div>
    `;

    this.clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   * Clear parent element
   */
  clear() {
    this._parentEl.innerHTML = '';
  }
}
