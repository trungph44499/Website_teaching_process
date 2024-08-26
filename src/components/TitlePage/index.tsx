import * as S from './styled';
type Props = {
  content: string;
};

const TitlePage = ({content}: Props) => {
  return (
    <S.Wrapper>
      <S.Title>{content}</S.Title>
    </S.Wrapper>
  );
};

export default TitlePage;
