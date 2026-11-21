import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuestion } from '../api/client.js';
import ChatPanel from '../components/ChatPanel.jsx';
import CodeEditor from '../components/CodeEditor.jsx';
import { LANGUAGES, DEFAULT_LANGUAGE } from '../config/languages.js';

export default function QuestionPage() {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [error, setError] = useState('');
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language'); // remember the student's choice between questions
    return LANGUAGES[saved] ? saved : DEFAULT_LANGUAGE;
  });
  const [drafts, setDrafts] = useState({}); // the student's code for each language

  const code = drafts[language] ?? LANGUAGES[language].starter;

  useEffect(() => {
    getQuestion(id)
      .then(setQuestion)
      .catch((err) => setError(err.message));
  }, [id]);

  function handleLanguageChange(e) {
    setLanguage(e.target.value);
    localStorage.setItem('language', e.target.value);
  }

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
        <div className="editor-wrap">
          <div className="editor-bar">
            <label htmlFor="language">Language</label>
            <select id="language" value={language} onChange={handleLanguageChange}>
              {Object.entries(LANGUAGES).map(([key, lang]) => (
                <option key={key} value={key}>{lang.label}</option>
              ))}
            </select>
          </div>
          <CodeEditor
            language={language}
            value={code}
            onChange={(newCode) => setDrafts({ ...drafts, [language]: newCode })}
          />
        </div>
      </section>
      <ChatPanel questionId={id} code={code} language={language} />
    </div>
  );
}
