import React, {ChangeEvent, FormEvent} from 'react';
import {useState} from 'react';
import './App.css';

import Block from './components/Block';

function App() {
    const [contents, setContents] = useState<string[]>([]);
    const [content, setContent] = useState<string>('');

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!content) {
            return;
        }

        setContents([...contents, content])
        setContent('')
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setContent(event.target.value);
    };

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleChange} value={content}/>
                <input type="submit"/>
            </form>
            {contents.map((x, i) => <Block content={x} key={i}/>)}
        </div>
    );
}

export default App;
