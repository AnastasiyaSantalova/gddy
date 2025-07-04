import { Routes, Route } from 'react-router-dom';
import RepoList from '../components/RepoList/RepoList';
import RepoDetails from '../components/RepoDetails/RepoDetails';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<RepoList />} />
      <Route path='/repo/:name' element={<RepoDetails />} />
    </Routes>
  );
}
