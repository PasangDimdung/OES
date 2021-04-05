package com.webapp.oes.jwtauthentication.mappers;

import com.webapp.oes.jwtauthentication.dtos.QuestionAddGetDto;
import com.webapp.oes.jwtauthentication.dtos.QuestionAddQdDto;
import com.webapp.oes.jwtauthentication.dtos.QuestionDetailsGetDto;
import com.webapp.oes.jwtauthentication.dtos.QuestionDetailsQuestionDto;
import com.webapp.oes.jwtauthentication.model.Question;
import com.webapp.oes.jwtauthentication.model.QuestionDetails;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2021-04-05T22:56:36+0545",
    comments = "version: 1.4.2.Final, compiler: Eclipse JDT (IDE) 1.3.1200.v20200916-0645, environment: Java 15.0.1 (Oracle Corporation)"
)
@Component
public class customMapperImpl implements customMapper {

    @Override
    public QuestionDetailsGetDto questionDetailsToQuestionDetailsGetDto(QuestionDetails questionDetails) {
        if ( questionDetails == null ) {
            return null;
        }

        QuestionDetailsGetDto questionDetailsGetDto = new QuestionDetailsGetDto();

        questionDetailsGetDto.setId( questionDetails.getId() );
        questionDetailsGetDto.setDepartment( questionDetails.getDepartment() );
        questionDetailsGetDto.setAcademic_year( questionDetails.getAcademic_year() );
        questionDetailsGetDto.setSemester( questionDetails.getSemester() );
        questionDetailsGetDto.setSubject( questionDetails.getSubject() );
        questionDetailsGetDto.setType( questionDetails.getType() );
        questionDetailsGetDto.setQuestions( questionListToQuestionDetailsQuestionDtoList( questionDetails.getQuestions() ) );

        return questionDetailsGetDto;
    }

    @Override
    public QuestionAddGetDto questionToQuestionGetDto(Question question) {
        if ( question == null ) {
            return null;
        }

        QuestionAddGetDto questionAddGetDto = new QuestionAddGetDto();

        questionAddGetDto.setId( question.getId() );
        questionAddGetDto.setTitle( question.getTitle() );
        questionAddGetDto.setPoints( question.getPoints() );
        questionAddGetDto.setQuestionDetails( questionDetailsToQuestionAddQdDto( question.getQuestionDetails() ) );

        return questionAddGetDto;
    }

    protected QuestionDetailsQuestionDto questionToQuestionDetailsQuestionDto(Question question) {
        if ( question == null ) {
            return null;
        }

        QuestionDetailsQuestionDto questionDetailsQuestionDto = new QuestionDetailsQuestionDto();

        questionDetailsQuestionDto.setId( question.getId() );
        questionDetailsQuestionDto.setTitle( question.getTitle() );
        questionDetailsQuestionDto.setPoints( question.getPoints() );

        return questionDetailsQuestionDto;
    }

    protected List<QuestionDetailsQuestionDto> questionListToQuestionDetailsQuestionDtoList(List<Question> list) {
        if ( list == null ) {
            return null;
        }

        List<QuestionDetailsQuestionDto> list1 = new ArrayList<QuestionDetailsQuestionDto>( list.size() );
        for ( Question question : list ) {
            list1.add( questionToQuestionDetailsQuestionDto( question ) );
        }

        return list1;
    }

    protected QuestionAddQdDto questionDetailsToQuestionAddQdDto(QuestionDetails questionDetails) {
        if ( questionDetails == null ) {
            return null;
        }

        QuestionAddQdDto questionAddQdDto = new QuestionAddQdDto();

        questionAddQdDto.setId( questionDetails.getId() );
        questionAddQdDto.setDepartment( questionDetails.getDepartment() );
        questionAddQdDto.setAcademic_year( questionDetails.getAcademic_year() );
        questionAddQdDto.setSemester( questionDetails.getSemester() );
        questionAddQdDto.setSubject( questionDetails.getSubject() );
        questionAddQdDto.setType( questionDetails.getType() );

        return questionAddQdDto;
    }
}
