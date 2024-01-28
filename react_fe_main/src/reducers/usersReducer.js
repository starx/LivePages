const initialState = {
  users: [],
  loading: false,
  error: null
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USERS':
      return { ...state, loading: true, error: null };
    case 'FETCH_USERS_SUCCESS':
      return { ...state, users: action.payload, loading: false };
    case 'FETCH_USERS_FAILURE':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default usersReducer;
