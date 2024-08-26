import React from 'react';
import {AiFillBank} from 'react-icons/ai';
import {Item, Wrapper} from './styled';

type Props = {};

const CountData = (props: Props) => {
  const data = [0, 1, 2, 3, 4];
  console.log(data.length);

  return (
    <Wrapper>
      <Item>
        <div className='icon'>
          <AiFillBank size={50} />
        </div>
        <div className='data'>5.82k</div>
        <div className='sub'>Số lớp chính thức</div>
        <div className='percent'>54.1%</div>
      </Item>
      <Item>
        <div className='icon'>
          <AiFillBank size={50} />
        </div>
        <div className='data'>5.82k</div>
        <div className='sub'>Số lớp học thử</div>
        <div className='percent'>S.1%</div>
      </Item>
      <Item>
        <div className='icon'>
          <AiFillBank size={50} />
        </div>
        <div className='data'>5.82k</div>
        <div className='sub'>Số học sinh</div>
        <div className='percent'>54.1%</div>
      </Item>
      <Item>
        <div className='icon'>
          <AiFillBank size={50} />
        </div>
        <div className='data'>5.82k</div>
        <div className='sub'>Số giáo viên</div>
        <div className='percent'>54.1%</div>
      </Item>
      <Item>
        <div className='icon'>
          <AiFillBank size={50} />
        </div>
        <div className='data'>5.82k</div>
        <div className='sub'>Số nhân viên</div>
        <div className='percent'>54.1%</div>
      </Item>
      <Item>
        <div className='icon'>
          <AiFillBank size={50} />
        </div>
        <div className='data'>5.82k</div>
        <div className='sub'>Tổng số Quizzes</div>
        <div className='percent'>54.1%</div>
      </Item>
    </Wrapper>
  );
};

export default CountData;
