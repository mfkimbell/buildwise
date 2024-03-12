import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes'; // Adjust the path as necessary
import { GlobalProvider } from './data/global-state'; // Adjust the path as necessary

const App: React.FC = () => {
  return (
    <GlobalProvider>
      <Router>
        <AppRoutes />
      </Router>
    </GlobalProvider>
  );
};

export default App;