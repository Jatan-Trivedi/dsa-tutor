import { javascript, javascriptLanguage, scopeCompletionSource } from '@codemirror/lang-javascript';
import { python, pythonLanguage } from '@codemirror/lang-python';
import { java, javaLanguage } from '@codemirror/lang-java';
import { cpp, cppLanguage } from '@codemirror/lang-cpp';
import { completeFromList } from '@codemirror/autocomplete';

// Every language the editor supports. To add one: install its @codemirror/lang-* package
// and add an entry here. The key (e.g. "python") is also sent to the server.

// JavaScript built-ins, including their methods (type "Math." to see them).
const jsGlobals = { Math, Map, Set, Array, Number, String, Object, JSON, console, Infinity, parseInt, parseFloat };

// Python already suggests built-ins like print and range, but not every keyword.
const pythonWords = [
  'and', 'break', 'continue', 'del', 'elif', 'else', 'False', 'from', 'import', 'in', 'is', 'lambda',
  'None', 'not', 'or', 'pass', 'return', 'True', 'while', 'yield',
];

// Java and C++ editor support only colors the code, so we add short word lists for autocomplete.
const javaWords = [
  'boolean', 'break', 'char', 'class', 'continue', 'double', 'else', 'extends', 'false', 'final', 'for', 'if',
  'int', 'long', 'new', 'null', 'private', 'public', 'return', 'static', 'String', 'this', 'true', 'void', 'while',
  'ArrayDeque', 'ArrayList', 'Arrays', 'Collections', 'Deque', 'HashMap', 'HashSet', 'Integer', 'LinkedList',
  'List', 'Map', 'Math', 'PriorityQueue', 'Queue', 'Set', 'Stack', 'StringBuilder',
  'System.out.println', 'Math.max', 'Math.min', 'Integer.MAX_VALUE', 'Integer.MIN_VALUE',
];
const cppWords = [
  'auto', 'bool', 'break', 'char', 'class', 'const', 'continue', 'double', 'else', 'false', 'for', 'if', 'int',
  'long', 'namespace', 'nullptr', 'return', 'sizeof', 'static', 'struct', 'true', 'using', 'void', 'while',
  'vector', 'string', 'map', 'unordered_map', 'set', 'unordered_set', 'stack', 'queue', 'deque',
  'priority_queue', 'pair', 'make_pair', 'sort', 'reverse', 'swap', 'min', 'max', 'abs',
  'cout', 'cin', 'endl', 'size', 'begin', 'end', 'push_back', 'pop_back', 'INT_MAX', 'INT_MIN',
];

export const LANGUAGES = {
  javascript: {
    label: 'JavaScript',
    starter: '// Write your solution here\n',
    extensions: [javascript(), javascriptLanguage.data.of({ autocomplete: scopeCompletionSource(jsGlobals) })],
  },
  python: {
    label: 'Python',
    starter: '# Write your solution here\n',
    extensions: [python(), pythonLanguage.data.of({ autocomplete: completeFromList(pythonWords) })],
  },
  java: {
    label: 'Java',
    starter: 'class Solution {\n  // Write your solution here\n}\n',
    extensions: [java(), javaLanguage.data.of({ autocomplete: completeFromList(javaWords) })],
  },
  cpp: {
    label: 'C++',
    starter: '#include <bits/stdc++.h>\nusing namespace std;\n\n// Write your solution here\n',
    extensions: [cpp(), cppLanguage.data.of({ autocomplete: completeFromList(cppWords) })],
  },
};

export const DEFAULT_LANGUAGE = 'javascript';
