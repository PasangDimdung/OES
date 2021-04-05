package com.webapp.oes.jwtauthentication.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity

public class Subject {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotBlank
    private String name;

    @NotBlank
    private int passMarks;

    @NotBlank
    private int fullMarks;

    @NotBlank
    private String duration;

    @ManyToOne()
    @JsonIgnoreProperties("subjects")
    private Semester semester;

    @ManyToOne()
    @JsonIgnoreProperties("subjects")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)    
    private Department department;

    @OneToMany(targetEntity = SubjectUnit.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "subject_id", referencedColumnName = "id")
    @JsonIgnoreProperties("subject")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)    
    private List<SubjectUnit> units;

    @OneToMany(mappedBy = "subject")
    @JsonIgnoreProperties("subject")
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)    
    private List<ExamSubject> sDates;


    // @OneToMany(mappedBy = "subject", cascade = CascadeType.ALL)
    // @JsonIgnore
    // private List<AnswerSheet> answerSheets = new ArrayList<>();

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPassMarks() {
        return passMarks;
    }

    public void setPassMarks(int passMarks) {
        this.passMarks = passMarks;
    }

    public int getFullMarks() {
        return fullMarks;
    }

    public void setFullMarks(int fullMarks) {
        this.fullMarks = fullMarks;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public Semester getSemester() {
        return semester;
    }

    public void setSemester(Semester semester) {
        this.semester = semester;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public List<SubjectUnit> getUnits() {
        return units;
    }

    public void setUnits(List<SubjectUnit> units) {
        this.units = units;
    }

    public List<ExamSubject> getsDates() {
        return sDates;
    }

    public void setsDates(List<ExamSubject> sDates) {
        this.sDates = sDates;
    }

    // public List<AnswerSheet> getAnswerSheets() {
    //     return answerSheets;
    // }

    // public void setAnswerSheets(List<AnswerSheet> answerSheets) {
    //     this.answerSheets = answerSheets;
    // }
}
