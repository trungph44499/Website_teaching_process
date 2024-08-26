import {Card, Col, Row, Typography} from 'antd';
import moment from 'moment';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {formatTime} from '~/helpers';
import {paidmanagerActions, paidmanagerSelector, useAppDispatch} from '~/redux';
import {selector} from '~/redux/auth';

const History = () => {
  const user: any = useSelector(selector.user);
  const histo = useSelector(paidmanagerSelector.selectList);
  const dispatch = useAppDispatch();
  const detailhis = histo.listone[0];
  console.log('detailhis', detailhis);

  const controlStatus = (status: any) => {
    switch (status) {
      case 0:
        return {
          label: 'Chưa học',
          color: 'orange',
        };
      case 1:
        return {
          label: 'Đã hoàn thành',
          color: 'green',
        };
      case 2:
        return {
          label: 'Vắng mặt',
          color: 'red',
        };
      case 3:
        return {
          label: 'Đã hủy',
          color: 'red',
        };
      default:
        break;
    }
  };

  useEffect(() => {
    if (user) dispatch(paidmanagerActions.readhistory({params: {id: user?._id}}));
  }, [dispatch, user]);

  return (
    <div>
      <Card>
        <Typography.Title level={3}>Mã lớp: {detailhis?.code}</Typography.Title>
        <p>Giáo viên: {detailhis?.teacher.name}</p>
        <p>Học sinh: {detailhis?.student[0].name}</p>
        <p>Môn học: {detailhis?.course.courseName}</p>
      </Card>

      <Card>
        <Typography.Title level={2}>Các buổi đã học</Typography.Title>
        <div style={{margin: 'auto', maxWidth: '1000px'}}>
          {detailhis?.schedule &&
            detailhis?.schedule?.map((item: any) => {
              return (
                <Col
                  key={item._id}
                  style={{
                    background: '#aab1b56b',
                    margin: '15px auto',
                    textAlign: 'center',
                    padding: '20px',
                    borderRadius: '5px',
                    width: '700px',
                  }}
                >
                  <Typography.Title level={3}>Tiều đề: {item?.curriculum?.title}</Typography.Title>
                  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                    <p>Mô tả buổi học: {item?.curriculum?.description}</p>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 15,
                      }}
                    >
                      <p>Ca học: {item.slot.text}</p>
                      <p>Ngày học: {formatTime(item.date)}</p>
                    </div>
                    <p style={{margin: 0, color: controlStatus(item.status)?.color}}>
                      Trạng thái: {controlStatus(item.status)?.label}
                    </p>
                  </div>
                </Col>
              );
            })}
        </div>
      </Card>
    </div>
  );
};

export default History;
