package com.webapp.oes.jwtauthentication.mappers;

import com.webapp.oes.jwtauthentication.dtos.QuestionDetailsGetDto;
import com.webapp.oes.jwtauthentication.dtos.QuestionAddGetDto;
import com.webapp.oes.jwtauthentication.model.Question;
import com.webapp.oes.jwtauthentication.model.QuestionDetails;

import org.mapstruct.Mapper;

@Mapper(
    componentModel = "spring"
)

public interface customMapper {
    QuestionDetailsGetDto questionDetailsToQuestionDetailsGetDto(QuestionDetails questionDetails);

    QuestionAddGetDto questionToQuestionGetDto(Question question);

}
