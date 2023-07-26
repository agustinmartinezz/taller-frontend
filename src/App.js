import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation';
import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;