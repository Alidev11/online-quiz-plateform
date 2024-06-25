package com.practice.quizonline.repository;

import com.practice.quizonline.model.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.net.ContentHandler;
import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    @Query("select distinct q.subject from Question q")
    List<String> findDistinctSubject();
    Page<Question> findBySubject(String subject, Pageable pageable);


}
