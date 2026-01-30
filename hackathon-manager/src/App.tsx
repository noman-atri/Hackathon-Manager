import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateTeam from './pages/CreateTeam';
import EditTeam from './pages/EditTeam';
import AppLayout from './layout/AppLayout';
import { TeamsProvider } from './context/TeamsContext';

function App() {
  return (
    <TeamsProvider>
      <Routes>
        <Route element={<AppLayout />}>
          // makes AppLayout the wrapper for these routes and same for all pages
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateTeam />} />
          <Route path="/edit/:teamId" element={<EditTeam />} />
        </Route>
      </Routes>
    </TeamsProvider>
  );
}

export default App;
