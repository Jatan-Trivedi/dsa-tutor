// Errors we throw on purpose. Their message is safe to show to the user.
export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

// Express 5 forwards errors from async handlers here automatically.
export function errorHandler(err, req, res, next) {
  if (err.name === 'CastError') {
    return res.status(404).json({ message: 'Question not found' }); // malformed id
  }
  if (err instanceof HttpError) {
    return res.status(err.status).json({ message: err.message });
  }
  console.error(err);
  res.status(500).json({ message: 'Something went wrong on our side.' });
}
