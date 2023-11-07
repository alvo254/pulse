import React, { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';

const SqlEditor = () => {
	const editorRef = useRef(null);

	useEffect(() => {
		// Register the SQL language and configure SQL IntelliSense
		if (editorRef.current) {
			const editor = editorRef.current;
			const monaco = editor.getMonaco();

			monaco.languages.register({ id: 'sql' });
			monaco.languages.setMonarchTokensProvider('sql', {
				tokenizer: {
					root: [
						[/\b(SELECT|FROM|WHERE|AND|OR)\b/, 'keyword'],
						// Define more SQL keywords and syntax rules here
					],
				},
			});

			monaco.languages.setLanguageConfiguration('sql', {
				comments: {
					lineComment: '--',
				},
			});

			// Provide IntelliSense for SQL keywords
			monaco.languages.registerCompletionItemProvider('sql', {
				provideCompletionItems: () => {
					return {
						suggestions: [
							{
								label: 'SELECT',
								kind: monaco.languages.CompletionItemKind
									.Keyword,
							},
							{
								label: 'FROM',
								kind: monaco.languages.CompletionItemKind
									.Keyword,
							},
							{
								label: 'WHERE',
								kind: monaco.languages.CompletionItemKind
									.Keyword,
							},
							{
								label: 'AND',
								kind: monaco.languages.CompletionItemKind
									.Keyword,
							},
							{
								label: 'OR',
								kind: monaco.languages.CompletionItemKind
									.Keyword,
							},
							// Add more SQL keyword suggestions
						],
					};
				},
			});
		}
	}, []);

	const editorDidMount = (editor, monaco) => {
		editorRef.current = editor;
	};

	return (
		<div style={{ height: '400px' }}>
			<Editor
				language='sql'
				editorDidMount={editorDidMount}
				theme='vs-dark'
				value={code}
				options={{
					inlineSuggest: true,
					fontSize: '16px',
					wordWrap: 'on',
					formatOnType: true,
					autoClosingBrackets: true,
					minimap: { enabled: false },
				}}
			/>
		</div>
	);
};

export default SqlEditor;
