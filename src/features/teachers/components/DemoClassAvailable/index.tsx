import {Badge, Empty, Modal} from 'antd';
import moment from 'moment';
import {useEffect, useState} from 'react';
import Loading from '~/components/common/Loading';
import {WEEKENDS_EN} from '~/constants';
import Note from '~/features/teachers/components/note';
import {
  ordersActions,
  teacherActions,
  teacherSelector,
  useAppDispatch,
  useAppSelector,
} from '~/redux';
import {selector} from '~/redux/auth';
import {CardCustom, Content, ContentItem, Header, Wrapper} from './styled';

type Props = {};

const DemoClassAvailable = (props: Props) => {
  const user = useAppSelector(selector.user);
  const dispatch = useAppDispatch();
  const listDemoClass = useAppSelector(teacherSelector.selectListDemoClassAvailable);
  const teacher = useAppSelector(teacherSelector.selectGetTransaction);
  const paidSlotAvailable = teacher?.result?.paidBookedSlots.filter(
    (item: any) => item.is_booked == true
  );
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const result = listDemoClass?.result.map((item: any) => {
      return item.map((itm: any) => {
        const hasItem = itm.student.listApply.find((itm: any) => {
          return itm._id == user?._id;
        });
        let allow: any = !paidSlotAvailable.some((item: any) => {
          return (
            item.day.toLowerCase() ==
              WEEKENDS_EN[new Date(itm.schedule[0].date).getDay()].toLowerCase() &&
            item.slot._id == itm.student.schedule.slots._id
          );
        });
        allow = allow ? 1 : 0;
        return !hasItem ? {...itm, applied: 0, allow} : {...itm, applied: 1, allow};
      });
    });
    setData(result);
  }, [listDemoClass]);

  const handleClick = (order: any) => {
    if (order.allow == false) return;
    if (order.applied == 0) {
      Modal.confirm({
        content: 'Bạn muốn ứng tuyển ?',
        centered: true,
        onOk: () => {
          dispatch(
            ordersActions.applyOrder({params: {_id: order.student._id, teacher: user?._id}})
          ).then((res: any) => {
            if (res.payload.status == 'success') {
              dispatch(teacherActions.fetchDemoClassAvailable({params: user?._id}));
            }
          });
        },
      });
    } else {
      Modal.confirm({
        content: 'Bạn muốn hủy ứng tuyển ?',
        centered: true,
        onOk: () => {
          dispatch(
            ordersActions.cancelApplyOrder({params: {_id: order.student._id, teacher: user?._id}})
          ).then((res: any) => {
            if (res.payload.status == 'success') {
              dispatch(teacherActions.fetchDemoClassAvailable({params: user?._id}));
            }
          });
        },
      });
    }
  };
  useEffect(() => {
    dispatch(teacherActions.fetchDemoClassAvailable({params: user?._id}));
    dispatch(teacherActions.read({params: user?._id}));
  }, []);
  return (
    <Wrapper>
      <Header>
        {data.map((item: any, index: number) => (
          <div className='item' key={index}>
            <div className='text'>{moment().add(index, 'days').format('LL')}</div>
            <div className='text'>{moment().add(index, 'days').format('dddd')}</div>
          </div>
        ))}
      </Header>
      {listDemoClass.loading ? (
        <Loading />
      ) : data.flat().length == 0 ? (
        <Empty style={{padding: '80px 0'}} />
      ) : (
        <Content>
          {data.map((item: any, index: number) => (
            <ContentItem key={index}>
              {item.map((itm: any) => (
                <Badge.Ribbon
                  text={`${itm.student.listApply.length} ứng tuyển`}
                  key={itm._id}
                  color='red'
                >
                  <CardCustom
                    title={'Ca học: ' + itm.student.schedule.slots.text}
                    size='small'
                    applied={itm.applied}
                    allow={itm.allow}
                    onClick={() => handleClick(itm)}
                  >
                    {itm.student.studentGrade}
                  </CardCustom>
                </Badge.Ribbon>
              ))}
            </ContentItem>
          ))}
        </Content>
      )}
      <Note />
    </Wrapper>
  );
};

export default DemoClassAvailable;
