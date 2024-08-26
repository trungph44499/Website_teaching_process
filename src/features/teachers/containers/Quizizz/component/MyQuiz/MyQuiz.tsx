import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './myQuiz.module.css';
// import { deleteQuiz } from "../../../actions/quiz"
// import { createGame } from "../../../actions/game"
import moment from 'moment';
import {
  EditOutlined,
  EllipsisOutlined,
  DeleteOutlined,
  PlayCircleOutlined,
  EyeOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Card, message } from 'antd';
import { Col, Row } from 'antd';
import * as S from './styles';
import { Link, useNavigate } from 'react-router-dom';
import {
  gameActions,
  gameSelector,
  loaderboardActions,
  loaderboardSelector,
  quizessActions,
  quizessSelector,
  socketdActions,
  socketSelector,
} from '~/redux';
import { createGame } from '~/redux/game/actions';
import { createLeaderboard } from '~/redux/Loaderboard/actions';
import { io } from 'socket.io-client';


function MyQuiz(props: any) {
  const quiz = props?.quiz;
  console.log('quiz', quiz);
  const { Meta } = Card;

  const [data, setData] = useState([] as any);
  console.log('Data', data);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const delData = useSelector(quizessSelector.selectDeleteTransaction);
  console.log('delData', delData);
  const sockets = useSelector(socketSelector.selectItem);
  console.log("sockets", sockets)
  const socket = sockets?.socket
  console.log("socket", socket)

  const newGameSelec = useSelector(gameSelector.selectList)
  console.log("newGameSelec", newGameSelec)
  const newGameAdd = newGameSelec?.result
  console.log("newGameAdd", newGameAdd)
  const arrLoaderboard = useSelector(loaderboardSelector.selectList)
  const loaderboardAdd = arrLoaderboard?.result;
  console.log("loaderboardAdd", loaderboardAdd)

  const gamecreate = useSelector(gameSelector.selectList);
  console.log('gameCreate', gamecreate);
  const idCre = gamecreate?.result?.quizId

  const user = localStorage.getItem('OWS');
  const object = JSON.parse(atob(user?.split('.')[1] as any));
  console.log('object', object);

  const idTeacher = object?._id;

  const addGame = async (o: any) => {

    let gameData = {
      quizId: o?._id,
      isLive: true,
      pin: String(Math.floor(Math.random() * 9000) + 1000),
      hostId: idTeacher,
    };
    const newGame = await dispatch(gameActions.createGame({ params: gameData }) as any);
    console.log('newGame', newGame);

    navigate(`/game/host/${o._id}`)
    let leaderboardData = { gameId: gamecreate?.result?._id, playerResultList: [] };
    console.log("leaderboardData", leaderboardData)

    const newLeaderboard = await dispatch(
      loaderboardActions.createLeaderboard({ params: leaderboardData }) as any
    );
    console.log('newLeaderboard', newLeaderboard);



    socket.emit('init-game', newGameAdd, loaderboardAdd);
    console.log("inits");

  };

  const deleteQuiz = async (id: any) => {
    try {
      await new Promise((res: any) => {
        dispatch(quizessActions.deleteQuiz({params: id, onSuccess: res}) as any);
        message.success('Xóa quizizz thành công ');
      });
      dispatch(quizessActions.getQuizes({}) as any);
    } catch (error) {
      message.error('Xóa quizes thất bại');
    }
  };

  useEffect(() => {
    quiz ? setData(quiz) : setData([]);
  }, []);

  // useEffect(() => {

  //   const socketurl: any = io('http://localhost:3001');
  //   dispatch(socketdActions.createSocket({ params: socketurl }) as any);

  //   // return () => socketurl.disconnect();
  // }, [])


  return (
    <S.WrapperMyQuiz>
      <Row gutter={[8, 8]}>
        {Array.isArray(quiz) &&
          quiz?.map((o: any) => {
            return (
              <Col span={6}>
                <Card
                  cover={<img alt='example' src={o?.backgroundImage} width={226} height={226} />}
                  actions={[
                    <DeleteOutlined
                      key='delete'
                      onClick={() => deleteQuiz(o?._id)}
                      type='danger'
                    />,

                    <Link to={`/quizzes/addquestion/${o._id}`}>
                      <PlusCircleOutlined />

                    </Link>,


                    <PlayCircleOutlined onClick={() => addGame(o)} />,
                  ]}
                >
                  <Meta
                    avatar={<Avatar src={`${o.backgroundImage}`} />}
                    title={o?.name}
                    description={o?.description}
                  />
                  <p> Questions: {o?.numberOfQuestions}</p>
                  <p> {moment(o?.dateCreated).fromNow()}</p>

                </Card>
              </Col>
            );
          })}
      </Row>
    </S.WrapperMyQuiz>
  );
}

export default MyQuiz;
