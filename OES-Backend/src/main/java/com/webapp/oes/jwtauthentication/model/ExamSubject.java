package com.webapp.oes.jwtauthentication.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class ExamSubject {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        Long id;
    
        @ManyToOne
        @JoinColumn(name = "exam_id")
        @JsonIgnoreProperties("sDates")
        @JsonIgnore
        Exam exam;
    
        @ManyToOne
        @JoinColumn(name = "subject_id")
        @JsonIgnoreProperties("sDates")
        Subject subject;
        
        String starting_date;

        String ending_date;

        String status;

        public Long getId() {
                return id;
        }

        public void setId(Long id) {
                this.id = id;
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

        public ExamSubject(Exam exam, Subject subject, String starting_date, String ending_date) {
                this.exam = exam;
                this.subject = subject;
                this.starting_date = starting_date;
                this.ending_date = ending_date;
                this.status = "pending";
        }

        public ExamSubject() {
        }

        public String getStatus() {
                return status;
        }

        public void setStatus(String status) {
                this.status = status;
        }
        
       
}
