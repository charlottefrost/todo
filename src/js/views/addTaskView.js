/**
 * Views: addTaskView
 * ------------------------------------------------------------------------------
 * Extends View.
 * Contains functions for the add task form view.
 *
 */
import View from './View.js';
import { v4 as uuidv4 } from 'uuid';

class addTaskView extends View {
  _parentEl = document.querySelector('[js-add-task="form"]');
  _showFormBtn = document.querySelector('[js-add-task="showBtn"]');
  _hideFormBtn = document.querySelector('[js-add-task="hideBtn"]');
  _submitBtn = document.querySelector('[js-add-task="submit"]');
  _errorMessage = 'Task could not be added.';

  constructor() {
    super();

    /**
     * Set event listeners
     */
    this._addHandlerShowForm();
    this._addHandlerHideForm();
  }

  /**
   * Toggle the form
   */
  toggleForm() {
    this._parentEl.classList.toggle('form--init-hidden');
  }

  /**
   * Close the form
   */
  closeForm() {
    this._parentEl.classList.add('form--init-hidden');
    this._parentEl.reset();
  }

  /**
   * Add event listener - show/hide form
   */
  _addHandlerShowForm() {
    this._showFormBtn.addEventListener('click', this.toggleForm.bind(this));
  }

  /**
   * Add event listener - hide form only
   */
  _addHandlerHideForm() {
    this._hideFormBtn.addEventListener('click', this.closeForm.bind(this));
  }

  /**
   * Add event listener - form submit
   * @param {requestCallback} handler - handles the data that was submitted
   */
  addHandlerSubmitForm(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();

      // Get form data and create object
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);

      // Sanitise tasks and category values
      data.task = data.task.replaceAll('"', `'`);
      data.category = data.category.replaceAll('"', `'`).toLowerCase().trim();
      if (data.category === '') data.category = 'uncategorised';

      // Add additional properties
      data.dateAdded = new Date().toISOString();
      data.id = uuidv4();

      handler(data);

      // Reset form
      this.reset();
    });
  }
}

export default new addTaskView();
