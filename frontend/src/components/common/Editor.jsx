'use client';
import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

const TextEditor = () => {
	const [codeOutput, setCodeOutput] = useState('');
	const code = `
	-- Uncomment the code below to see how it works
	-- SELECT 
    -- tweetid,
   -- author_username,
    --sentiment,
    -- sentiment_positive_score,
   -- sentiment_negative_score,
    -- sentiment_neutral_score,
    -- sentiment_mixed_score
-- FROM tweets_catalog_database.sentiments`;
	const handleEditorChange = (value, event) => {
		// console.log(value);
		setCodeOutput(value);
	};
	return (
		<div className='w-full'>
			<Editor
				// height='100px'
				// width={200}
				className='min-h-[24rem] w-[80%]'
				language='sql'
				theme='vs-dark'
				value={code}
				options={{
					inlineSuggest: true,
					fontSize: '16px',
					formatOnType: true,
					autoClosingBrackets: true,
					minimap: { scale: 10 },
				}}
				onChange={handleEditorChange}
			/>
		</div>
	);
};

export default TextEditor;
