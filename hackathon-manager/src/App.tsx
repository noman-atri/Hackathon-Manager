import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateTeam from './pages/CreateTeam';
import EditTeam from './pages/EditTeam';
import AppLayout from './layout/AppLayout';
import { TeamsProvider } from './context/TeamsContext';
import Projects from './pages/Projects';
import { ProjectsProvider } from './context/ProjectsContext';
import AddProject from './pages/CreateProject';
import EditProjects from './pages/EditProjects';

function App() {
  return (
    <TeamsProvider>
      <ProjectsProvider>
        <Routes>
          <Route element={<AppLayout />}>
            {/* makes AppLayout the wrapper for these routes and same for all pages */}
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateTeam />} />
            <Route path="/edit/:teamId" element={<EditTeam />} />
            {/* Projects */}
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/create" element={<AddProject />} />
            <Route path="/projects/:projectId" element={<EditProjects />} />
          </Route>
        </Routes>
      </ProjectsProvider>
    </TeamsProvider>
  );
}

export default App;
