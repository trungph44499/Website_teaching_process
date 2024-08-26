import {useParams} from 'react-router-dom';
import TitlePage from '~/components/TitlePage';
import FeedbackForm from './components/Form';
import * as S from './styled';

const FeedBackPage = () => {
  const {sessionId} = useParams<string>();
  return (
    <S.Wrapper>
      <TitlePage content='Send your feedback' />
      <S.Main>
        <FeedbackForm sessionId={sessionId} />
      </S.Main>
    </S.Wrapper>
  );
};

export default FeedBackPage;
