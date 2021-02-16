export const initialState = {
  user: null,
  allUser: null,
  chatUser: null,
};

export const actionTypes = {
  SET_USER: "SET_USER",
  SET_ALL_USERS: "SET_ALL_USERS",
  SET_CHAT_USER: "SET_CHAT_USER",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.SET_ALL_USERS:
      return {
        ...state,
        allUser: action.allUser,
      };
    case actionTypes.SET_CHAT_USER:
      return {
        ...state,
        chatUser: action.chatUser,
      };
    default:
      return state;
  }
};

export default reducer;
