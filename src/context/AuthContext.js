import * as React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

const AuthContext = React.createContext();

// Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case 'set_name':
      return {
        ...state,
        name: action.payload[0].toUpperCase() + action.payload.slice(1),
      };
    case 'remove_name':
      return {...state, name: ''};
    default:
      return state;
  }
};

export const AuthProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(authReducer, {name: null});

  const setName = async (nameGiven, isNew) => {
    try {
      if (isNew) {
        // only if name isn't in storage, so we don't set the same item again
        await AsyncStorage.setItem('name', nameGiven);
        dispatch({type: 'set_name', payload: nameGiven});
      } else {
        dispatch({type: 'set_name', payload: nameGiven});
      }
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  const removeName = async () => {
    try {
      await AsyncStorage.removeItem('name');
      dispatch({type: 'remove_name'});
    } catch (error) {
      console.log(error);
    }
    console.log('REMOVED');
  };

  return (
    <AuthContext.Provider value={{state, setName, removeName}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
