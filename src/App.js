import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Session from './components/Session';
import { store } from './store/store';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      {/* <Navigation /> */}
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigation />}>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/register" element={<Session operation='register' />} />
              <Route path="/login" element={<Session operation='login' />} />
              <Route path="/index.html" element={<Session operation='login' />} />
            </Route>
          </Routes>
          <Toaster />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
