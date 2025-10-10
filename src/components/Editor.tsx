// src/components/Editor.tsx
import React, { useRef } from 'react';
import Editor, { type OnMount } from '@monaco-editor/react';

interface EditorProps {
  code: string;
  setCode: (code: string) => void;
}

export const CodeEditor: React.FC<EditorProps> = ({ code, setCode }) => {
  const editorRef = useRef<any>(null);

  const handleEditorMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  return (
    <Editor
      height="500px"
      width="500px"
      defaultLanguage="python"
      defaultValue={code}
      onMount={handleEditorMount}
      onChange={(value) => setCode(value || '')}
      theme="vs-dark"
      
    />
  );
};
