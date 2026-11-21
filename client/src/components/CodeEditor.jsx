import CodeMirror, { EditorView } from '@uiw/react-codemirror';
import { javascript, javascriptLanguage, scopeCompletionSource } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';

// Built-in names offered by autocomplete, including their methods (type "Math." to see them).
const globals = { Math, Map, Set, Array, Number, String, Object, JSON, console, Infinity, parseInt, parseFloat };

// javascript() gives syntax colors, keyword/snippet completion (for, if, function...) and variables
// from your own code. The second line adds the built-in names above.
// Defined outside the component so it is not rebuilt on every keystroke.
const extensions = [
  javascript(),
  javascriptLanguage.data.of({ autocomplete: scopeCompletionSource(globals) }),
  EditorView.contentAttributes.of({ 'aria-label': 'Your code' }),
];

export default function CodeEditor({ value, onChange }) {
  return (
    <CodeMirror
      className="editor"
      value={value}
      onChange={(newValue) => onChange(newValue)}
      height="360px"
      theme={vscodeDark}
      extensions={extensions}
      // The default setup already includes line numbers, auto-indent on Enter, Tab to indent,
      // auto-closing brackets and quotes, bracket matching, undo/redo and the autocomplete popup.
      basicSetup={{ tabSize: 2 }}
    />
  );
}
