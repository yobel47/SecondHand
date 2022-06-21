import {
  GET_USER_SUCCESS, GET_USER_FAILED, UPDATE_USER_SUCCESS, UPDATE_USER_FAILED,
} from '../types';

const initialState = {
  profileData: [],
};

const ProfileReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return {
        ...state,
        profileData: action.payload,
      };
    case GET_USER_FAILED:
      return {
        ...state,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        profileData: action.payload,
      };
    case UPDATE_USER_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default ProfileReducer;