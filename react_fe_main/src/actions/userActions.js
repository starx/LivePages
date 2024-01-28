const express_be_main_fqdn = process.env.REACT_APP_EXPRESS_BE_MAIN_FQDN;

export const fetchUsers = () => {
  return async dispatch => {
    try {
      const response = await fetch(`${express_be_main_fqdn}/users`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      dispatch({ type: 'FETCH_USERS_SUCCESS', payload: data });
    } catch (error) {
      console.error(error);
      dispatch({ type: 'FETCH_USERS_FAILURE', payload: error.message });
    }
  };
};
