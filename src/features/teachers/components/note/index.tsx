import {Card, Col, Row, Typography} from 'antd';
import React from 'react';
import * as S from './styled';

const Note = () => {
  return (
    <S.Wraper>
      <Row gutter={24}>
        <Col span={8}>
          <Card>
            <S.Title1 level={2}>Chú thích</S.Title1>

            <S.Note1>Lớp học đã đăng ký dạy.</S.Note1>
            {/* <Col>Lớp học này đang mở và cần thêm giáo viên dạy.</Col>
            <Col>Bạn đã đăng ký dạy cho lớp học này.</Col>
            <Col>Bạn đang trong danh sách chờ dạy cho lớp này.</Col>
            <Col>Bạn đã đăng ký dạy cho lớp học này.</Col>
            <Col>Bạn có một ca dạy demo trong lớp này.</Col>
            <Col>Bạn có ca dạy chính thức trong lớp này.</Col> */}
            <S.Note2>Lớp học chưa đăng ký.</S.Note2>
            <S.Note3>Lớp học bị trùng lịch dạy.</S.Note3>
          </Card>
        </Col>
        <S.NoteImpo span={14}>
          <S.Title2 level={1}>Thông báo quan trọng</S.Title2>
          <S.Desc>
            Email và thông báo Slack sẽ chỉ được gửi cho các xác nhận xảy ra tối đa sáu giờ trước
            bản demo. Tất cả xác nhận trước đó sẽ chỉ hiển thị trên trang tổng quan của bạn.
          </S.Desc>
          <br />
          <S.Desc>
            Bạn đánh dấu tình trạng sẵn sàng cho một vị trí càng sớm thì cơ hội nhận được xác nhận
            cho vị trí đó càng cao
          </S.Desc>
        </S.NoteImpo>
      </Row>
    </S.Wraper>
  );
};

export default Note;
