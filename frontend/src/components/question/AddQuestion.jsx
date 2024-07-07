import React, { useEffect, useState } from 'react';
import { createQuestion, getSubjects } from '../../../utils/QuizService';

const AddQuestion = () => {
    const [question, setQuestion] = useState("");
    const [questionType, setQuestionType] = useState("single");
    const [choices, setChoices] = useState([""]);
    const [correctAnswers, setCorrectAnswers] = useState([""]);
    const [subject, setSubject] = useState("");
    const [newSubject, setNewSubject] = useState("");
    const [subjectOptions, setSubjectOptions] = useState([]);

    useEffect(() => {
        fetchSubjects()
    }, [])

    const fetchSubjects = async () => {
        try {
            const subjectData = await getSubjects();
            setSubjectOptions(subjectData);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddChoice = () => {
        try {
            const lastChoice = choices[choices.length];
            const lastChoiceLetter = lastChoice ? lastChoice.charAt(0) : "A";
            const newChoiceLetter = String.fromCharCode(lastChoiceLetter.charCodeAt(0) + 1);
            const newChoice = `${newChoiceLetter}.`;
            setChoices([...choices, newChoice]);
        } catch (error) {
            console.error(error);
        }
    };

    const handleRemoveChoice = (index) => {
        try {
            setChoices(choices.filter((choice, i) => i !== index));
        } catch (error) {
            console.error(error);
        }
    };

    const handleChoiceChange = (index, value) => {
        try {
            setChoices(choices.map((choice, i) => (i === index ? value : choice)));
        } catch (error) {
            console.error(error);
        }
    };

    const handleCorrectAnswerChange = (index, value) => {
        try {
            setCorrectAnswers(correctAnswers.map((answer, i) => (i === index ? value : answer)));
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddCorrectAnswer = () => {
        setCorrectAnswers([...correctAnswers, ""]);
    };

    const handleRemoveCorrectAnswer = (index) => {
        setCorrectAnswers(correctAnswers.filter((answer, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = {
                question,
                questionType,
                choices,
                correctAnswers: correctAnswers.map((answer) => {
                    const choiceLetter = answer.charAt(0).toUpperCase();
                    const choiceIndex = choiceLetter.charCodeAt(0) - 65;
                    return choiceIndex >= 0 && choiceIndex < choices.length ? choiceLetter : null;
                }), subject
            }
            await createQuestion(result);
            setQuestion("");
            setQuestionType("single");
            setChoices([""]);
            setCorrectAnswers([""]);
            setSubject("");
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddSubject = () => {
        if (newSubject.trim() !== "") {
            setSubjectOptions([...subjectOptions, newSubject.trim()]);
            setNewSubject("");
        }
    };


    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-md-6 mt-5'>
                    <div className='card'>
                        <div className='card-header'>
                            <h5 className='card-title'>Add New Question</h5>
                        </div>
                        <div className='card-body'>
                            <form onSubmit={handleSubmit} className='p-2'>
                                <div className='mb-3'>
                                    <label htmlFor="subject" className='form-label text-info'>Select a subject</label>
                                    <select name="subject" id="subject"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        className='form-select'>
                                        <option value={""}>Select a Subject</option>
                                        <option value={"New"}>Add New Subject</option>
                                        {subjectOptions.map((option, index) => (
                                            <option key={index} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {subject === "New" && (
                                    <div className='mb-3'>
                                        <label htmlFor="new-subject" className='form-label text-info'>
                                            Add New Subject
                                        </label>
                                        <input type="text"
                                            id='new-subject'
                                            value={newSubject}
                                            onChange={(e) => setNewSubject(e.target.value)}
                                            className='form-control'
                                        />
                                        <button
                                            type='button'
                                            className='flex-div btn btn-outline-primary mt-2 btn-sm m-auto'
                                            onClick={handleAddSubject}
                                        >Add Subject</button>
                                    </div>
                                )}
                                <hr />
                                <div className="mb-2">
                                    <label htmlFor="question" className="form-label text-info">Question</label>
                                    <br />
                                    <textarea className='from-control w-100'
                                        rows={4}
                                        value={question}
                                        onChange={(e) => setQuestion(e.target.value)}
                                        placeholder='Enter the question here...'>
                                    </textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="question-type" className="form-label text-info">Question Type</label>
                                    <select id="question-type"
                                        className="form-select"
                                        value={questionType}
                                        onChange={(e) => setQuestionType(e.target.value)}>
                                        <option value={"single"}>Single Answer</option>
                                        <option value={"multiple"}>Multiple Answers</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="choices" className="form-label text-info">Choices</label>
                                    <div className='mb-3'>
                                        <input
                                            type="text"
                                            value={choices[0]}
                                            onChange={(e) => handleChoiceChange(0, e.target.value)}
                                            className='form-control'
                                            placeholder='Ex: true'
                                        />
                                    </div>

                                    {choices.map((choice, index) => (
                                        index > 0 && (
                                            <div className='input-group mb-3'>
                                                <input
                                                    type="text"
                                                    value={choice}
                                                    onChange={(e) => handleChoiceChange(index, e.target.value)}
                                                    className='form-control'
                                                    placeholder='Ex: false'
                                                />
                                                <button
                                                    type='button'
                                                    onClick={() => handleRemoveChoice(index)}
                                                    className='btn btn-outline-danger btn-sm'>
                                                    Remove
                                                </button>

                                            </div>
                                        )))}
                                    <button
                                        type='button'
                                        onClick={handleAddChoice}
                                        className='flex-div btn btn-outline-primary btn-sm m-auto'>
                                        Add Choice
                                    </button>
                                </div>
                                <hr />


                                {questionType === "single" && (
                                    <div className='mb-3'>
                                        <label htmlFor="answer" className='form-label text-info'>Correct Answer</label>
                                        <input
                                            type="text"
                                            value={correctAnswers[0]}
                                            onChange={(e) => handleCorrectAnswerChange(0, e.target.value)}
                                            className='form-control'
                                            placeholder='Ex: false'
                                        />
                                    </div>

                                )}
                                {questionType === "multiple" && (
                                    <div className='mb-3'>
                                        <label htmlFor="answer" className='form-label text-info'>Correct Answer</label>

                                        {correctAnswers.map((answer, index) => (
                                            <div className='input-group mb-3'>
                                                <input
                                                    type="text"
                                                    value={answer}
                                                    onChange={(e) => handleCorrectAnswerChange(index, e.target.value)}
                                                    className='form-control'
                                                    placeholder='Ex: false'
                                                />
                                                {index > 0 && (
                                                    <button type='button' className="btn btn-outline-danger btn-sm"
                                                        onClick={() => handleRemoveCorrectAnswer(index)}
                                                    >
                                                        Remove
                                                    </button>
                                                )}
                                            </div>

                                        ))}
                                        <button type='button' className="flex-div btn btn-outline-info btn-sm float-right"
                                            onClick={handleAddCorrectAnswer}
                                        >
                                            Add Correct Answer
                                        </button>
                                    </div>
                                )}
                                {!correctAnswers.length && <p>Please enter at least one correct answer.</p>}
                                <hr />
                                <button type='submit' className='btn btn-success'>
                                    Save Question
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default AddQuestion;