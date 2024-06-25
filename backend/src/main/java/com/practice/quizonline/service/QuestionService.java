package com.practice.quizonline.service;

import com.practice.quizonline.model.Question;
import com.practice.quizonline.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

//defines this class as a service
@Service
//defines a constructor with arguments to reduce boiler plate code
@RequiredArgsConstructor
public class QuestionService implements IQuestionService {

    //Repository that handles database interaction
    private final QuestionRepository questionRepository;

    //method that create a question and use repo to save it  to the database
    @Override
    public Question createQuestion(Question question) {
        return questionRepository.save(question);
    }

    //method that fetch all questions, I assume it lazy fetch them
    @Override
    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    //method that fetch one question by its ID
    @Override
    public Optional<Question> getQuestionById(long id) {
        return questionRepository.findById(id);
    }

    //method that fetches distinct subjects
    @Override
    public List<String> getAllSubjects() {
        return questionRepository.findDistinctSubject();
    }

    @Override
    public Question updateQuestion(Long id, Question question) throws ChangeSetPersister.NotFoundException {
        Optional<Question> theQuestion = this.getQuestionById(id);
        if(theQuestion.isPresent()){
            Question updatedQuestion = theQuestion.get();
            updatedQuestion.setQuestion(question.getQuestion());
            updatedQuestion.setChoices(question.getChoices());
            updatedQuestion.setCorrectAnswers(question.getCorrectAnswers());
            return questionRepository.save(updatedQuestion);
        }else{
            throw new ChangeSetPersister.NotFoundException();
        }

    }

    @Override
    public void deleteQuestion(Long id) {
        questionRepository.deleteById(id);
    }

    @Override
    public List<Question> getQuestionsForUser(Integer numOfQuestions, String subject) {
        Pageable pageable = PageRequest.of(0, numOfQuestions);
        return questionRepository.findBySubject(subject, pageable).getContent();
    }
}
