import API from "../../../util/ApiFetch";

export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: "USER/REQUEST/PENDING" });
  try {
    const users = await API.getUsers();
    dispatch({ type: "USERS/REQUEST/FULFILLED", payload: users });
  } catch (error) {
    dispatch({ type: "USER/REQUEST/REJECTED", payload: error.message });
  }
};

export const getUserById = (id) => async (dispatch) => {
  dispatch({ type: "USER/REQUEST/PENDING" });
  try {
    const user = await API.getUserById(id);
    dispatch({ type: "USER/REQUEST/FULFILLED", payload: user });
  } catch (error) {
    dispatch({ type: "USER/REQUEST/REJECTED", payload: error.message });
  }
};

export const signUpUser = (alias, email, password) => async (dispatch) => {
  dispatch({ type: "USER/REQUEST/PENDING" });
  try {
    const user = await API.signUp(alias, email, password);
    console.log(user);
    dispatch({ type: "USER/REQUEST/FULFILLED", payload: user });
  } catch (error) {
    dispatch({ type: "USER/REQUEST/REJECTED", payload: error.message });
  }
};

export const logOutUser = () => async (dispatch) => {
  dispatch({ type: "USER/REQUEST/FULFILLED", payload: null });
};

export const getUsersByQuery = (query) => async (dispatch) => {
  dispatch({ type: "USER/REQUEST/PENDING" });
  try {
    const user = await API.getUsersByQuery(query);
    if (!user) {
      dispatch({ type: "USER/REQUEST/REJECTED", payload: "Check credentials" });
    } else {
      dispatch({ type: "USER/REQUEST/FULFILLED", payload: user });
    }
  } catch (error) {
    dispatch({ type: "USER/REQUEST/REJECTED", payload: error.message });
  }
};
