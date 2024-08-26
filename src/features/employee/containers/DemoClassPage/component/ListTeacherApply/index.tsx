import {Avatar, Button, List} from 'antd';
import {useEffect} from 'react';
import {Title, Wrapper} from './styled';

type ListItemType = {
  _id?: string;
  title: string;
  avatar?: string;
  description?: string;
};

type Props = {
  loading?: boolean;
  idSelected?: string;
  data: ListItemType[];
  clickApply?: any;
  clickDetail?: any;
};

const ListTeacherApply = (props: Props) => {
  useEffect(() => {
    if (!props.idSelected) return;
    const index = props.data.findIndex((item: any) => item._id == props.idSelected);
    const listEl = document.querySelectorAll<HTMLElement>('.item');
    listEl.forEach((el: HTMLElement, i: number) => {
      if (index == i) {
        el.style.background = '#f4f4f4';
      } else {
        el.style.background = 'none';
      }
    });
  }, [props.idSelected]);
  return (
    <Wrapper>
      <Title>Danh sách ứng tuyển</Title>
      <List
        loading={props.loading}
        itemLayout='vertical'
        dataSource={props.data}
        renderItem={(item) => (
          <List.Item
            className='item'
            key={item._id}
            actions={[
              <Button key='detail' onClick={() => props.clickDetail(item)}>
                Chi tiết
              </Button>,
              <Button key='apply' type='primary' onClick={() => props?.clickApply(item)}>
                Đồng ý
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src='https://joeschmoe.io/api/v1/random' />}
              title={<a href='https://ant.design'>{item.title}</a>}
              description='Giáo viên có kinh nghiệm phong phú, phù hợp với nhiều ngôn ngữ và lứa tuổi của học sinh'
            />
          </List.Item>
        )}
      />
    </Wrapper>
  );
};

export default ListTeacherApply;
