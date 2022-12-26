/**
 * Views: categoryView
 * ------------------------------------------------------------------------------
 * Extends View.
 * Contains functions for the category view.
 *
 */
import View from './View.js';

class categoryView extends View {
  _parentEl = document.querySelector('[js-categories="container"]');
  _errorMessage = '';

  /**
   * Add event listener - page load
   * @param {requestCallback} handler - renders categories from state
   */
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  /**
   * Add event listener - click on category links
   * @param {requestCallback} handler - renders matching tasks for clicked category
   */
  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('[js-categories="btn"]');

      if (!btn) return;

      const category = btn.dataset.category;

      handler(category);
    });
  }

  /**
   * Generate link markup for `all`
   */
  _generateAllLink() {
    return `
      <li class="nav__item">
        <button 
          class="nav__btn"
          title="all"
          data-category="all"
          js-categories="btn"
        >
          All
        </button>
      </li>
    `;
  }

  /**
   * Generate link markup for each category
   */
  _generateMarkup() {
    let data = this._data;

    /**
     * Place into an array if there is only one item
     */
    if (!Array.isArray(data)) {
      data = [];
      data.push(this._data);
    }

    return [
      this._generateAllLink(),
      data
        .map((category) => {
          return `
            <li class="nav__item">
              <button 
                class="nav__btn" 
                title="${category}"
                data-category="${category}"
                js-categories="btn"
              >
                ${category.charAt(0).toUpperCase()}${category.slice(1)}
              </button>
            </li>
          `;
        })
        .join(''),
    ].join('');
  }
}

export default new categoryView();
