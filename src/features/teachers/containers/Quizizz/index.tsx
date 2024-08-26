import {Button} from 'antd';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import withAuth from '~/helpers/withAuth';
import {quizessActions, quizessSelector} from '~/redux';
import MyQuiz from './component/MyQuiz/MyQuiz';
import * as S from './styles';

interface Props {}

const MyQuizizz = (props: Props) => {
  const dispatch = useDispatch();
  const quizes = useSelector(quizessSelector.selectList);
  const datalistQuiz = quizes?.result;

  console.log('quizes', quizes);
  console.log('datalistQuiz', datalistQuiz);
  useEffect(() => {
    dispatch(quizessActions.getQuizes({}) as any);
  }, []);

  return (
    <>
      <S.Button type='primary'>
        <Link to={'/quizzes/add'}>Thêm Quizess</Link>
      </S.Button>
      <MyQuiz quiz={datalistQuiz} />
    </>
  );
};

export default MyQuizizz;
