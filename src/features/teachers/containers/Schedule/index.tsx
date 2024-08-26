import TitlePage from '~/components/TitlePage';
import {Tabs} from 'antd';
import * as S from './styled';
import Mark from '../../components/Mark';
import ClassCalendar from './component/ClassCalendar';
import DemoClassAvailable from '../../components/DemoClassAvailable';
type Props = {};

const Schedule = (props: Props) => {
  const configTabs = [
    {
      label: `Lớp học thử`,
      key: '1',
      children: <DemoClassAvailable />,
    },
    {
      label: `Thời khóa biểu`,
      key: '2',
      children: <ClassCalendar />,
    },
    {
      label: `Lịch dạy cố định`,
      key: '3',
      children: <Mark />,
    },
  ];

  return (
    <S.Wrapper>
      <S.Main>
        <TitlePage content='Lịch dạy (Theo giờ Việt Nam)' />
        <S.MainTab>
          <Tabs defaultActiveKey='2' items={configTabs} />
        </S.MainTab>
      </S.Main>
    </S.Wrapper>
  );
};

export default Schedule;
