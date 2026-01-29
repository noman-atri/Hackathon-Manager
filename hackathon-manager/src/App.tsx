import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateTeam from './pages/CreateTeam';
import EditTeam from './pages/EditTeam';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="/create-team" element={<CreateTeam />} /> 
      <Route path="/edit-team" element={<EditTeam />} /> 
    </Routes>
  );
}

export default App;
