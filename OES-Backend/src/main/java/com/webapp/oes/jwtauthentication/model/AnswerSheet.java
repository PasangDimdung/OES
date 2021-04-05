package com.webapp.oes.jwtauthentication.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
public class AnswerSheet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "exam_id")
    @JsonIgnoreProperties("answerSheets")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)    
    private Exam exam;

    @ManyToOne
    @JoinColumn(name = "student_id")
    @JsonIgnoreProperties("answerSheets")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)    
    private User student;

    @ManyToOne
    @JoinColumn(name = "question_id")
    @JsonIgnoreProperties("answerSheets")
    private Question question;

    @ManyToOne
    @JoinColumn(name = "selectedChoice_id")
    @JsonIgnoreProperties("answerSheets")
    private QuestionChoice choice;

    @ManyToOne
    @JoinColumn(name = "subject_id")
    @JsonIgnoreProperties("answerSheets")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)    
    private Subject subject;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getStudent() {
        return student;
    }

    public void setStudent(User student) {
        this.student = student;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public Exam getExam() {
        return exam;
    }

    public void setExam(Exam exam) {
        this.exam = exam;
    }

    public Subject getSubject() {
        return subject;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }

    public QuestionChoice getChoice() {
        return choice;
    }

    public void setChoice(QuestionChoice choice) {
        this.choice = choice;
    }




}
