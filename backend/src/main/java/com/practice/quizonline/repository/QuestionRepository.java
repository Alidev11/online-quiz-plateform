package com.practice.quizonline.repository;

import com.practice.quizonline.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    List<String> findDistinctSubject();

}
