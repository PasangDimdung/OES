package com.webapp.oes.jwtauthentication.dtos;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class QuestionDetailsGetDto {
    
    @JsonProperty("id")
    private int id;

    @JsonProperty("department")
    private String department;

    @JsonProperty("academic_year")
    private String academic_year;

    @JsonProperty("semester")
    private String semester;

    @JsonProperty("subject")
    private String subject;
        
    @JsonProperty("type")
    private String type;

    @JsonProperty("questions")
    private List<QuestionDetailsQuestionDto> questions;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getAcademic_year() {
        return academic_year;
    }

    public void setAcademic_year(String academic_year) {
        this.academic_year = academic_year;
    }

    public String getSemester() {
        return semester;
    }

    public void setSemester(String semester) {
        this.semester = semester;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<QuestionDetailsQuestionDto> getQuestions() {
        return questions;
    }

    public void setQuestions(List<QuestionDetailsQuestionDto> questions) {
        this.questions = questions;
    }
}
