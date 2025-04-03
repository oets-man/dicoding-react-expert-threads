import actions from '../actions';

const { categories: ActionType } = actions;

const categoryReducer = (state = [], action = {}) => {
  switch (action.type) {
    case ActionType.SET_CATEGORIES:
      return action.payload;

    case ActionType.TOGGLE_CATEGORY_SELECTION:
      return state.map((cat) => (cat.category === action.payload ? { ...cat, selected: !cat.selected } : cat));
    default:
      return state;
  }
};

export default categoryReducer;
