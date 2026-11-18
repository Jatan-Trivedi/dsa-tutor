import { Routes, Route, Link } from 'react-router-dom';
import QuestionListPage from './pages/QuestionListPage.jsx';
import QuestionPage from './pages/QuestionPage.jsx';

export default function App() {
  return (
    <>
      <header className="topbar">
        <Link to="/">DSA Tutor</Link>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<QuestionListPage />} />
          <Route path="/questions/:id" element={<QuestionPage />} />
        </Routes>
      </main>
    </>
  );
}
