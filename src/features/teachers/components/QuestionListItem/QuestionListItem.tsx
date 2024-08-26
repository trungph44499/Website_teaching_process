import React from "react"
import styles from "./questionListItem.module.css"
import * as S from "./styles"
// import defaultQuestionImage from "../../../assets/defaultQuestionImage.svg"

function QuestionListItem({ number, type, name, time, image, onClick }: any) {
  return (
    <S.ListItem onClick={onClick}>
      <S.LitsItemTitle>
        <span className={styles["question-list-number"]}>{number}&nbsp;</span>
        {type}
      </S.LitsItemTitle>
      <S.QuestionPreview>
        <S.QuestionPreviewTitle>
          {name}
        </S.QuestionPreviewTitle>
        <S.QuestionPreviewTime>{time}</S.QuestionPreviewTime>
        <S.QuestionPreviewBackgroundImage>
          {image?.length === 0 ? (
            <img src="https://cdn.mos.cms.futurecdn.net/oRMtEHPj8CxAvJ5P9BUp36.jpg" alt="" />
          ) : (
            <img src={image} alt="" />
          )}
        </S.QuestionPreviewBackgroundImage>
        <S.QuestionPreviewAnswers>
          <S.AnswerImage></S.AnswerImage>
          <S.AnswerImage></S.AnswerImage>
          <S.AnswerImage></S.AnswerImage>
          <S.AnswerImage></S.AnswerImage>
        </S.QuestionPreviewAnswers>
      </S.QuestionPreview>
    </S.ListItem>
  )
}

export default QuestionListItem
