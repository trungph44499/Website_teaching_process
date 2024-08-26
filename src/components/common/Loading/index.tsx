import {Spin} from 'antd';
import {LoadingWrapper} from './styled';

type Props = {
  height?: string;
};

const Loading = (props: Props) => {
  return (
    <LoadingWrapper height={props.height}>
      <Spin size='large' />
    </LoadingWrapper>
  );
};

export default Loading;
