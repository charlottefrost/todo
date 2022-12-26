/**
 * Model
 * ------------------------------------------------------------------------------
 * Contains scripts that involve handling data, and the app state.
 *
 */
import {
  PRIORITIES,
  STORAGE_KEY_TASKS,
  STORAGE_KEY_CAT,
  STORAGE_KEY_CURRENT_CAT,
} from './config';

export const state = {
  tasks: [],
  categories: [],
  currentCategory: '',
};

/**
 * Set local storage
 * @param {String} item - storage key
 */
function persist(item) {
  localStorage.setItem(item, JSON.stringify(state[item]));
}

/**
 * Get local storage items
 * @param {Object} keys - storage key(s)
 */
function getStorageItem(...keys) {
  keys.forEach((key) => {
    const storage = localStorage.getItem(key);

    if (storage) state[key] = JSON.parse(storage);

    if (key === STORAGE_KEY_CURRENT_CAT && !storage) {
      state[key] = 'all';
      persist(key);
    }
  });
}

export const addTask = function (data) {
  // Push the data to tasks array
  state.tasks.push(data);

  // Add it to localStorage
  persist(STORAGE_KEY_TASKS);
};

export const deleteTask = function (id, category) {
  /**
   * Check if other tasks exist with this category
   * Remove from categories array if not
   */
  const tasksWithCategory = state.tasks.filter(
    (task) => task.category === category
  );

  if (tasksWithCategory.length <= 1) {
    const catIndex = state.categories.findIndex((cat) => cat === category);
    state.categories.splice(catIndex, 1);
  }

  // Remove task from array
  const taskIndex = state.tasks.findIndex((task) => task.id === id);
  state.tasks.splice(taskIndex, 1);

  // Update localStorage
  persist(STORAGE_KEY_TASKS);
  persist(STORAGE_KEY_CAT);
};

export const editTask = function (input, id) {
  // Find task to edit
  const taskToEdit = state.tasks.find((task) => task.id === id);

  // Update task value
  taskToEdit.task = input.value.replaceAll('"', `'`);

  // Update localStorage
  persist(STORAGE_KEY_TASKS);
};

export const addCategory = function (data) {
  // Add to categories array if it doesn't already exist
  if (!state.categories.includes(data.category)) {
    state.categories.push(data.category);
  }

  // Update localStorage
  persist(STORAGE_KEY_CAT);
};

export const getMatchingTasks = function (category) {
  /**
   * Return entire array if 'all' was clicked,
   * else return matching tasks only
   */
  return category === 'all'
    ? state.tasks
    : state.tasks.filter((task) => task.category === category);
};

export const updateCurrentCategory = function (category) {
  // Update current category in state
  state.currentCategory = category;
  persist(STORAGE_KEY_CURRENT_CAT);
};

export const filter = function (input, tasks) {
  // Make shallow copy of tasks array
  const tasksArr = [...tasks];

  if (input.value === 'priority') {
    return tasksArr.sort(
      // ex: PRIORITIES['urgent'] = 0
      (a, b) => PRIORITIES[a[input.value]] - PRIORITIES[b[input.value]]
    );
  }

  return tasksArr;
};

export const getDate = function () {
  const date = new Date();
  const options = {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  };

  return new Intl.DateTimeFormat(navigator.language, options).format(date);
};

function init() {
  getStorageItem(STORAGE_KEY_TASKS, STORAGE_KEY_CAT, STORAGE_KEY_CURRENT_CAT);
}

init();
