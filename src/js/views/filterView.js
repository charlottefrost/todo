/**
 * Views: filterView
 * ------------------------------------------------------------------------------
 * Extends View.
 * Contains functions for the filter view.
 *
 */
import View from './View.js';

class filterView extends View {
  _parentEl = document.querySelector('[js-filters="container"]');
  _title = document.querySelector('[js-filters="title"]');
  _form = document.querySelector('[js-filters="form"]');
  _input = document.querySelector('[js-filters="input"]');

  /**
   * Add event listener - filter change
   * @param {requestCallback} handler - handles filtering & rendering tasks
   */
  addHandlerFilterChange(handler) {
    this._form.addEventListener('change', function (e) {
      const input = e.target.closest('[js-filters="input"]');

      if (!input) return;

      handler(input);
    });
  }

  /**
   * Update filter view - title, reset form elements
   * @param {String} category - currently selected category
   */
  update(category) {
    this._updateTitle(category);
    this._resetForm();
  }

  /**
   * Enable form elements
   */
  enable() {
    if (this._input.hasAttribute('disabled')) {
      this._input.removeAttribute('disabled');
    }
  }

  /**
   * Disable form elements
   */
  disable() {
    this._input.setAttribute('disabled', '');
  }

  /**
   * Update title
   * @param {String} category - currently selected category
   */
  _updateTitle(category) {
    this._title.textContent = `${category
      .charAt(0)
      .toUpperCase()}${category.slice(1)}`;
  }

  /**
   * Reset form
   */
  _resetForm() {
    this._form.reset();
  }
}

export default new filterView();
