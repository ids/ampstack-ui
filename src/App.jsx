import { Authenticator } from '@aws-amplify/ui-react';
import About from './Components/About';
import Welcome from './Components/Welcome';
import RequireAuth from './Components/RequireAuth';
import Login from './Components/Login';
import Workspace from './Components/Workspace';
import { Layout } from './Layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';

function AmpStackRoutes() {

  return (
    <BrowserRouter>
      <main className="App-background">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Welcome />} />
          <Route
            path="workspace"
            element={
              <RequireAuth>
                <Workspace />
              </RequireAuth>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
      </main>
    </BrowserRouter>
  );
}

function App() {
  return (
    <Authenticator.Provider>
      <AmpStackRoutes />
    </Authenticator.Provider>
  );
}

export default App;