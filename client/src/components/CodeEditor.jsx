import { useMemo } from 'react';
import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { LANGUAGES } from '../config/languages.js';

export default function CodeEditor({ value, onChange, language }) {
  // Rebuilt only when the language changes, not on every keystroke.
  const extensions = useMemo(
    () => [...LANGUAGES[language].extensions, EditorView.contentAttributes.of({ 'aria-label': 'Your code' })],
    [language]
  );

  return (
    <CodeMirror
      key={language} // a fresh editor per language keeps undo history separate
      className="editor"
      value={value}
      onChange={(newValue) => onChange(newValue)}
      height="360px"
      theme={vscodeDark}
      extensions={extensions}
      // The default setup already includes line numbers, auto-indent, Tab to indent,
      // auto-closing brackets and quotes, bracket matching, undo/redo and the autocomplete popup.
      basicSetup={{ tabSize: 2 }}
    />
  );
}
