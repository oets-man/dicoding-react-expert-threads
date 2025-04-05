import actions from '../actions';

const { categories: ActionType } = actions;

const toggleCategorySelection = (category) => ({
  type: ActionType.TOGGLE_CATEGORY_SELECTION,
  payload: category,
});

const extractCategoriesFromThreads = () => (dispatch, getState) => {
  const threads = getState().threads;

  const categoriesMap = {};
  threads.forEach((thread) => {
    categoriesMap[thread.category] = true;
  });

  const categoriesArray = Object.keys(categoriesMap).map((category) => ({
    category,
    selected: true,
  }));

  dispatch({
    type: ActionType.SET_CATEGORIES,
    payload: categoriesArray,
  });
};

export { toggleCategorySelection, extractCategoriesFromThreads };
