import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuestion } from '../api/client.js';
import ChatPanel from '../components/ChatPanel.jsx';
import CodeEditor from '../components/CodeEditor.jsx';

export default function QuestionPage() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [error, setError] = useState('');
  const [code, setCode] = useState('// Write your solution here\n');

  useEffect(() => {
    getQuestion(id)
      .then(setQuestion)
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <p className="status error">{error}</p>;
  if (!question) return <p className="status">Loading...</p>;

  return (
    <div className="workspace">
      <section className="work-left">
        <div className="problem">
          <h1>
            {question.title} <span className={`chip ${question.difficulty.toLowerCase()}`}>{question.difficulty}</span>
          </h1>
          <p>{question.description}</p>
          <pre>{question.examples}</pre>
        </div>
        <CodeEditor value={code} onChange={setCode} />
      </section>
      <ChatPanel questionId={id} code={code} />
    </div>
  );
}
