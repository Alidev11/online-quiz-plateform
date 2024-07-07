import { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import AddQuestion from './components/question/AddQuestion';
import GetAllQuiz from './components/quiz/GetAllQuiz';
import './App.css';

function App() {
  return (
    <div className="App">
      <AddQuestion/>
      <GetAllQuiz/>
    </div>
  )
}

export default App
