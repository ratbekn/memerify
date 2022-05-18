import React from 'react';
import { useState } from 'react';
import './App.css';

import Block from './components/Block'

function App() {
  const [contents, _] = useState<string[]>(['Bob', 'Alice', 'John'])

  return (
    <div className="App">
      {contents.map((x, i) => <Block content={x} key={i}/>)}
    </div>
  );
}

export default App;
