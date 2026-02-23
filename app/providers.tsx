import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store'; // Adjust the import based on your store file location

const AppProvider = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
};

export default AppProvider;