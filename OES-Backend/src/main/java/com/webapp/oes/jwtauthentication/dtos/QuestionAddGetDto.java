package com.webapp.oes.jwtauthentication.dtos;


import com.fasterxml.jackson.annotation.JsonProperty;

public class QuestionAddGetDto {

    @JsonProperty("id")
    private int id;

    @JsonProperty("title")
    private String title;

    @JsonProperty("points")
    private int points;

    @JsonProperty("questionDetails")
    private QuestionAddQdDto questionDetails;

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

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public QuestionAddQdDto getQuestionDetails() {
        return questionDetails;
    }

    public void setQuestionDetails(QuestionAddQdDto questionDetails) {
        this.questionDetails = questionDetails;
    }


    

    
}
