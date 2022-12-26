/**
 * Views: taskView
 * ------------------------------------------------------------------------------
 * Extends View.
 * Contains functions for the task view.
 *
 */
import View from './View.js';

class taskView extends View {
  _parentEl = document.querySelector('[js-task="container"]');
  _errorMessage = `You don't seem to have any tasks yet.`;

  /**
   * Add event listener - page load
   * @param {requestCallback} handler - renders tasks from state
   */
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  /**
   * Add event listener - clicking 'done' button
   * @param {requestCallback} handler - handles deletion of task
   */
  addHandlerMarkDone(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('[js-task="doneBtn"]');

      if (!btn) return;

      const task = btn.closest('[js-task="task"]');

      task.remove();

      handler(task.dataset.id, btn.dataset.category);
    });
  }

  /**
   * Add event listener - focusout on task input element
   * @param {requestCallback} handler - handles updating the task in state
   */
  addHandlerEdit(handler) {
    this._parentEl.addEventListener('focusout', function (e) {
      const input = e.target.closest('[js-task="input"]');

      if (!input) return;

      const id = input.closest('[js-task="task"]').dataset.id;
      handler(input, id);
    });
  }

  /**
   * Get current number of tasks in list
   */
  getTaskCount() {
    return this._parentEl.querySelectorAll('[js-task="task"]').length;
  }

  /**
   * Generate task markup
   */
  _generateMarkup() {
    let data = this._data;

    /**
     * When adding a task, it's a single object -
     * so it should be placed into an array
     */
    if (!Array.isArray(data)) {
      data = [];
      data.push(this._data);
    }

    return data
      .map((item) => {
        return `
          <div class="task" data-id="${item.id}" js-task="task">
            <button 
              class="task__btn"
              data-category="${item.category}"
              js-task="doneBtn"
            >
              <span class="visually-hidden">Mark done</span>
            </button>
            <input 
              class="task__desc no-focus-border"
              type="text"
              value="${item.task}"
              aria-label="task"
              js-task="input"
            >
            <span class="task__label task__label--${item.priority}">
              ${item.priority}
            </span>
          </div>
        `;
      })
      .join('');
  }
}

export default new taskView();
