import { useEffect, useRef, useState } from 'react';
import { askTutor } from '../api/client.js';

export default function ChatPanel({ questionId, code }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function handleSend(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const updated = [...messages, { role: 'user', content: text }];
    setMessages(updated);
    setInput('');
    setError('');
    setLoading(true);

    try {
      // The current code is sent along so the tutor can react to what the student wrote.
      const { reply } = await askTutor(questionId, updated, code);
      setMessages([...updated, { role: 'assistant', content: reply }]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <aside className="chat">
      <div className="chat-log" aria-live="polite">
        {messages.length === 0 && (
          <p className="muted">Stuck? Describe your idea or where you are blocked. The tutor can see your code.</p>
        )}
        {messages.map((m, i) => (
          <p key={i} className={`bubble ${m.role}`}>{m.content}</p>
        ))}
        {loading && <p className="bubble assistant muted">Thinking...</p>}
        {error && <p className="status error">{error}</p>}
        <div ref={bottomRef} />
      </div>
      <form className="chat-form" onSubmit={handleSend}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask for a hint..." />
        <button disabled={loading || !input.trim()}>Send</button>
      </form>
    </aside>
  );
}
