package com.webapp.oes.jwtauthentication.message.response;

public class ReportResponse {

    private int id;
    
    private String name;

    private String registration_num;

    private String exam;

    private String department;

    private String semester;

    private String subjectName;

    private int subjectFullMarks;

    private int subjectPassMarks;

    private int marksObtained;

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

    public String getRegistration_num() {
        return registration_num;
    }

    public void setRegistration_num(String registration_num) {
        this.registration_num = registration_num;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getSemester() {
        return semester;
    }

    public void setSemester(String semester) {
        this.semester = semester;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public ReportResponse(int id, String name, String registration_num, String exam, String department, String semester,
            String subjectName, int subjectFullMarks2, int subjectPassMarks2, int marks) {
        this.id = id;
        this.name = name;
        this.registration_num = registration_num;
        this.exam = exam;
        this.department = department;
        this.semester = semester;
        this.subjectName = subjectName;
        this.subjectFullMarks = subjectFullMarks2;
        this.subjectPassMarks = subjectPassMarks2;
        this.marksObtained = marks;
    }

    public String getExam() {
        return exam;
    }

    public void setExam(String exam) {
        this.exam = exam;
    }

    public int getMarksObtained() {
        return marksObtained;
    }

    public void setMarksObtained(int marksObtained) {
        this.marksObtained = marksObtained;
    }

    public int getSubjectFullMarks() {
        return subjectFullMarks;
    }

    public void setSubjectFullMarks(int subjectFullMarks) {
        this.subjectFullMarks = subjectFullMarks;
    }

    public int getSubjectPassMarks() {
        return subjectPassMarks;
    }

    public void setSubjectPassMarks(int subjectPassMarks) {
        this.subjectPassMarks = subjectPassMarks;
    }

    
}
