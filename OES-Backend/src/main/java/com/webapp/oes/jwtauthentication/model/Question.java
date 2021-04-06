package com.webapp.oes.jwtauthentication.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity

public class Question {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank
    private String title;

    private int points;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "question_id", referencedColumnName = "id")
    private List<QuestionChoice> op;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "answer_id")
    private QuestionAnswer answer;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "qdetails_id", referencedColumnName = "id")
    @JsonIgnoreProperties("questions")
    private QuestionDetails questionDetails;

    @ManyToOne()
    @JoinColumn(name = "unit_id", referencedColumnName = "id")
    @JsonIgnoreProperties("questions")
    private SubjectUnit subjectUnit;

    
    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "qpaper_question", 
    	joinColumns = @JoinColumn(name = "question_id"), 
        inverseJoinColumns = @JoinColumn(name = "qpaper_id")) 
    @JsonIgnoreProperties("questions") 
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)    
    private List<QuestionPaper> qPapers;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    // @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)    
    private List<AnswerSheet> answerSheets = new ArrayList<>();

    public Question(String title2, List<QuestionChoice> op2, QuestionAnswer answer2, SubjectUnit subjectUnit, int points) {
        this.title = title2;
        this.op = op2;
        this.answer = answer2;
        this.subjectUnit = subjectUnit;
        this.points = points;
	}

	public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<QuestionChoice> getOp() {
        return op;
    }

    public void setOp(List<QuestionChoice> op) {
        this.op = op;
    }

    public QuestionAnswer getAnswer() {
        return answer;
    }

    public void setAnswer(QuestionAnswer answer) {
        this.answer = answer;
    }

    public QuestionDetails getQuestionDetails() {
        return questionDetails;
    }

    public void setQuestionDetails(QuestionDetails questionDetails) {
        this.questionDetails = questionDetails;
    }

    public Question() {
    }

    public SubjectUnit getSubjectUnit() {
        return subjectUnit;
    }

    public void setSubjectUnit(SubjectUnit subjectUnit) {
        this.subjectUnit = subjectUnit;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public List<QuestionPaper> getqPapers() {
        return qPapers;
    }

    public void setqPapers(List<QuestionPaper> qPapers) {
        this.qPapers = qPapers;
    }

    public List<AnswerSheet> getAnswerSheets() {
        return answerSheets;
    }

    public void setAnswerSheets(List<AnswerSheet> answerSheets) {
        this.answerSheets = answerSheets;
    }
}
