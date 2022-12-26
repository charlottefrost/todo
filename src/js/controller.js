/**
 * Controller
 * ------------------------------------------------------------------------------
 * Contains scripts for application logic.
 *
 */
import 'core-js/stable';
import * as model from './model.js';
import headerView from './views/headerView.js';
import addTaskView from './views/addTaskView.js';
import categoryView from './views/categoryView.js';
import taskView from './views/taskView.js';
import filterView from './views/filterView.js';

/**
 * Handle header
 * - display date
 */
function controlHeader() {
  const date = model.getDate();
  headerView.render(date, false);
}

/**
 * Handle initial task list view
 */
function controlTasks() {
  // Get tasks from current category
  const tasks = model.getMatchingTasks(model.state.currentCategory);

  // Render tasks
  taskView.render(tasks);

  // Update title, reset filters
  filterView.update(model.state.currentCategory);

  // Enable filters if there are multiple tasks
  if (taskView.getTaskCount() >= 2) {
    filterView.enable();
  }
}

/**
 * Handle adding a task
 * @param {Object} data - data from the add task form
 */
function controlAddTask(data) {
  let clear = false;

  // Store the task in the state
  model.addTask(data);

  // Add category to state if new
  model.addCategory(data);

  // Close the add task form
  addTaskView.toggleForm();

  // Set clear to true for the first task
  if (model.state.tasks.length === 1) {
    clear = true;
  }

  /**
   * Render task if the category matches current,
   * or current category is 'all'
   */
  if (
    data.category === model.state.currentCategory ||
    model.state.currentCategory === 'all'
  ) {
    taskView.render(data, clear);
  }

  // Enable filters when there are 2 tasks
  if (taskView.getTaskCount() === 2) {
    filterView.enable();
  }

  // Render categories in nav
  categoryView.render(model.state.categories);
}

/**
 * Handle deleting a task
 * @param {String} id - from task element
 * @param {String} category - from task button element
 */
function controlDeleteTask(id, category) {
  // Remove task from state
  model.deleteTask(id, category);

  // Re-render nav
  categoryView.render(model.state.categories);

  // Disable filters if there is only 1 task
  if (taskView.getTaskCount() === 1) {
    filterView.disable();
  }
}

/**
 * Handle editing a task
 * @param {Object} input - input element
 * @param {String} id - from task element
 */
function controlEditTask(input, id) {
  model.editTask(input, id);
}

/**
 * Handle filtering
 * @param {Object} input - filter input element.
 */
function controlFilters(input) {
  // Get tasks to filter
  const currentTasks = model.getMatchingTasks(model.state.currentCategory);

  // Filter tasks
  const tasks = model.filter(input, currentTasks);

  // Clear task list
  taskView.clear();

  // Re-render tasks
  taskView.render(tasks);
}

/**
 * Handle initial nav
 */
function controlLoadNav() {
  categoryView.render(model.state.categories);
}

/**
 * Handle nav links
 * @param {String} category - from the clicked nav element
 */
function controlNav(category) {
  // Get the tasks that match the category that was clicked
  const tasks = model.getMatchingTasks(category);

  // Render matching tasks
  taskView.render(tasks);

  // Update title, reset filters
  filterView.update(category);

  // Set current category
  model.updateCurrentCategory(category);

  if (taskView.getTaskCount() >= 2) {
    filterView.enable();
  } else {
    filterView.disable();
  }

  // Close form and nav if open
  addTaskView.closeForm();
  headerView.closeNav();
}

function init() {
  headerView.addRenderHandler(controlHeader);
  addTaskView.addHandlerSubmitForm(controlAddTask);
  taskView.addHandlerRender(controlTasks);
  taskView.addHandlerMarkDone(controlDeleteTask);
  taskView.addHandlerEdit(controlEditTask);
  filterView.addHandlerFilterChange(controlFilters);
  categoryView.addHandlerRender(controlLoadNav);
  categoryView.addHandlerClick(controlNav);

  console.log(model.state.tasks);
}

init();
