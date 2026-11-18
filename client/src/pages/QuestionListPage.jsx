import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getQuestions } from '../api/client.js';

export default function QuestionListPage() {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getQuestions()
      .then(setQuestions)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="status">Loading questions...</p>;
  if (error) return <p className="status error">{error}</p>;

  return (
    <section className="list">
      <h1>Pick a problem</h1>
      <p className="muted">Write the solution yourself. The tutor will ask questions and give hints, never the answer.</p>
      <ul>
        {questions.map((q) => (
          <li key={q._id}>
            <Link to={`/questions/${q._id}`}>
              <span>{q.title}</span>
              <span className={`chip ${q.difficulty.toLowerCase()}`}>{q.difficulty}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
