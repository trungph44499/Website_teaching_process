import styled from '~/helpers/styled-component';

export const ListItem = styled.div`
  padding: 10px;
`;
export const LitsItemTitle = styled.h3`
  margin-bottom: 8px;
  color: rgb(51, 51, 51);
  font-size: 0.9rem;
  font-weight: 700;
  &:hover {
    
  }
`;
export const QuestionListNumber = styled.span``;

export const QuestionPreview = styled.div`
  background-color: rgb(248, 244, 244);
  border-radius: 5%;
  padding: 5px;
  border: 3px solid rgb(248, 244, 244);
  transition: border-color 0.5s ease;
`;

export const QuestionPreviewTitle = styled.h4`
  text-align: center;
  color: rgb(110, 110, 110);
  line-height: 1.33;
  letter-spacing: 0.2px;
`;
export const QuestionPreviewTime = styled.div`
  border-radius: 50%;
  border: 0.5px solid rgb(199, 182, 182);
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 0.8rem;
`;
export const QuestionPreviewBackgroundImage = styled.div`
  padding: 5px;
  position: relative;
  margin: 5px;
  top: -10px;
  & img {
    width: 25%;
    height: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const QuestionPreviewAnswers = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 15px;
`;
export const AnswerImage = styled.div`
  position: relative;
  width: 40%;
  height: 7px;
  margin: 5px;
  border: 1px solid rgb(167, 146, 146);
  border-radius: 0.3rem;
`;
