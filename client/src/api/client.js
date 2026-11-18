// All calls to the backend live here, so components never deal with fetch details.
async function request(path, options) {
  const res = await fetch(`/api${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

export const getQuestions = () => request('/questions');
export const getQuestion = (id) => request(`/questions/${id}`);
export const askTutor = (id, messages, code) =>
  request(`/tutor/${id}`, { method: 'POST', body: JSON.stringify({ messages, code }) });
