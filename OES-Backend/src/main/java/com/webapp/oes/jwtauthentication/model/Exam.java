package com.webapp.oes.jwtauthentication.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
public class Exam {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(min = 5)
    private String name;

    private String starting_date;

    private String ending_date;

    private String semester;

    private String academic_year;

    private String department;

    private String status = "pending";

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "exam_department", 
    	joinColumns = @JoinColumn(name = "exam_id"), 
        inverseJoinColumns = @JoinColumn(name = "department_id")) 
    @JsonIgnoreProperties("exams")  
    private Set<Department> departments = new HashSet<>();

    @OneToMany(mappedBy = "exam", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ExamSubject> sDates = new ArrayList<>();

    @OneToMany(mappedBy = "exam", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)    
    private List<AnswerSheet> answerSheets = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Department> getDepartments() {
        return departments;
    }

    public void setDepartments(Set<Department> departments) {
        this.departments = departments;
    }

    public String getStarting_date() {
        return starting_date;
    }

    public void setStarting_date(String starting_date) {
        this.starting_date = starting_date;
    }

    public String getEnding_date() {
        return ending_date;
    }

    public void setEnding_date(String ending_date) {
        this.ending_date = ending_date;
    }

    public String getSemester() {
        return semester;
    }

    public void setSemester(String semester) {
        this.semester = semester;
    }

    public String getAcademic_year() {
        return academic_year;
    }

    public void setAcademic_year(String academic_year) {
        this.academic_year = academic_year;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public List<ExamSubject> getsDates() {
        return sDates;
    }

    public void setsDates(List<ExamSubject> sDates) {
        this.sDates = sDates;
    }

    public List<AnswerSheet> getAnswerSheets() {
        return answerSheets;
    }

    public void setAnswerSheets(List<AnswerSheet> answerSheets) {
        this.answerSheets = answerSheets;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

   
    
}
