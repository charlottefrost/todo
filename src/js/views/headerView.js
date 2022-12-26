/**
 * Views: headerView
 * ------------------------------------------------------------------------------
 * Extends View.
 * Contains functions for the header view.
 *
 */
import View from './View.js';

class headerView extends View {
  _parentEl = document.querySelector('[js-header="container"]');
  _navToggle = document.querySelector('[js-header="navToggle"]');
  _nav = document.querySelector('[js-nav="nav"]');
  _errorMessage = '';
  _stringOpenNav = 'Open navigation';
  _stringCloseNav = 'Close navigation';

  constructor() {
    super();

    /**
     * Set event listeners
     */
    this._addNavToggleHandler();
    this._getHeaderHeight();
  }

  /**
   * Add event listener - page load
   * @param {requestCallback} handler - renders additional header elements
   */
  addRenderHandler(handler) {
    window.addEventListener('load', handler);
  }

  /**
   * Toggle nav
   */
  toggleNav() {
    const label = this._navToggle.getAttribute('aria-label');

    // Toggle classes on nav and button itself
    this._navToggle.classList.toggle('open');
    this._nav.classList.toggle('open');

    // Update button label
    this._navToggle.setAttribute(
      'aria-label',
      label === this._stringOpenNav ? this._stringCloseNav : this._stringOpenNav
    );
  }

  /**
   * Close nav only
   */
  closeNav() {
    if (this._navToggle.classList.contains('open')) {
      this._navToggle.classList.remove('open');
      this._nav.classList.remove('open');
      this._navToggle.setAttribute('aria-label', this._stringOpenNav);
    }
  }

  /**
   * Get header height
   */
  _getHeaderHeight() {
    const height = this._parentEl.offsetHeight;

    // Set as css variable in document root
    document
      .querySelector(':root')
      .style.setProperty('--header-height', `${height}px`);
  }

  /**
   * Add event listener - click on nav toggle
   */
  _addNavToggleHandler() {
    this._navToggle.addEventListener('click', this.toggleNav.bind(this));
  }

  /**
   * Generate markup for additional elements
   */
  _generateMarkup() {
    return `<p class="header__date">${this._data}</p>`;
  }
}

export default new headerView();
