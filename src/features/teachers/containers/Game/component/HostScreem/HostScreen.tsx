import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import styles from './hostScreen.module.css';
import Question from '../Question/Question';
import WaitingRoom from '../WaitingRoom/waitingRoom';
import {updateCurrentLeaderboard, updateQuestionLeaderboard} from '~/redux/Loaderboard/actions';
import {getGame} from '~/redux/game/actions';
import {
  gameSelector,
  loaderboardActions,
  loaderboardSelector,
  quizessActions,
  quizessSelector,
  socketdActions,
  socketSelector,
} from '~/redux';
interface Props {}

const HostScreen = (props: Props) => {
  const sockets = useSelector(socketSelector.selectItem);

  const socket = sockets?.socket;
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isPreviewScreen, setIsPreviewScreen] = useState(false);
  const [isQuestionScreen, setIsQuestionScreen] = useState(false);
  const [isQuestionResultScreen, setIsQuestionResultScreen] = useState(false);
  const [isLeaderboardScreen, setIsLeaderboardScreen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [playerList, setPlayerList] = useState<any>([]);
  const [questionData, setQuestionData] = useState({
    questionType: 'Quiz',
    pointType: 'Standard',
    answerTime: 5,
    backgroundImage: '',
    question: '',
    answerList: [
      {name: 'a', body: '', isCorrect: false},
      {name: 'b', body: '', isCorrect: false},
      {name: 'c', body: '', isCorrect: false},
      {name: 'd', body: '', isCorrect: false},
    ],
    questionIndex: 1,
  });

  const dispatch = useDispatch();
  const params = useParams();
  console.log('params', params);
  const game = useSelector(gameSelector.selectList);
  console.log('game', game);
  const idCres = game?.result?.quizId;
  const quizs = useSelector(quizessSelector.selectList);
  const quiz = quizs?.quiz;

  const leaderboard = useSelector(loaderboardSelector.selectUpdateTransaction);
  console.log('leaderboard', leaderboard);

  const leaderboards = useSelector(loaderboardSelector.selectUpdateTransactioncurrent);

  const [questionResult, setQuestionResult] = useState(leaderboard?.questionLeaderboard);
  const [currentLeaderboard, setCurrentLeaderboard] = useState(leaderboards?.currentLeaderboard);

  useEffect(() => {
    dispatch(getGame({params: params?.id}) as any);
  }, [params, dispatch]);

  useEffect(() => {
    if (game) {
      dispatch(quizessActions.getQuiz({params: idCres}) as any);
    }
  }, [dispatch, game]);

  useEffect(() => {
    setTimer(5);
  }, []);

  useEffect(() => {
    socket?.on('get-answer-from-player', (data: any, id: any, score: any, player: any) => {
      console.log('data', data);
      console.log('id', id);
      console.log('score', score);
      console.log('player', player);

      updateLeaderboard(data, id, score);
      let playerData = {id: data.playerId, userName: player.userName};
      setPlayerList((prevstate: any) => [...prevstate, playerData]);
    });
  }, [socket]);

  const updateLeaderboard = async (data: any, id: any, score: any) => {
    let question = await dispatch(
      loaderboardActions.updateQuestionLeaderboard({params: {id: id, data: data}}) as any
    );
    setQuestionResult(question.questionLeaderboard[data.questionIndex - 1]);
    let leaderboardData: any = {
      questionIndex: data.questionIndex,
      playerId: data.playerId,
      playerCurrentScore: score,
    };
    let leaderboard = await dispatch(
      loaderboardActions.updateCurrentLeaderboard({params: {id: id, data: leaderboardData}}) as any
    );

    setCurrentLeaderboard(leaderboard.currentLeaderboard[data.questionIndex - 1]);
  };

  const startGame = () => {
    socket.emit('start-game', quiz);
    socket.emit('question-preview', () => {
      startPreviewCountdown(5, currentQuestionIndex);
    });
    setIsGameStarted((prevstate) => !prevstate);
    setIsPreviewScreen(true);
  };

  const startPreviewCountdown = (seconds: any, index: any) => {
    setIsLeaderboardScreen(false);
    setIsPreviewScreen(true);
    let time = seconds;
    let interval = setInterval(() => {
      setTimer(time);
      if (time === 0) {
        clearInterval(interval);
        displayQuestion(index);
        setIsPreviewScreen(false);
        setIsQuestionScreen(true);
      }
      time--;
    }, 1000);
  };

  const startQuestionCountdown = (seconds: any, index: any) => {
    let time = seconds;
    let interval = setInterval(() => {
      setTimer(time);
      if (time === 0) {
        clearInterval(interval);
        displayQuestionResult(index);
      }
      time--;
    }, 1000);
  };
  const displayQuestionResult = (index: any) => {
    setIsQuestionScreen(false);
    setIsQuestionResultScreen(true);
    setTimeout(() => {
      displayCurrentLeaderBoard(index);
    }, 5000);
  };

  const displayCurrentLeaderBoard = (index: any) => {
    setIsQuestionResultScreen(false);
    setIsLeaderboardScreen(true);
    setTimeout(() => {
      socket.emit('question-preview', () => {
        startPreviewCountdown(5, index);
        setPlayerList([]);
      });
    }, 5000);
  };

  const displayQuestion = (index: any) => {
    if (index === quiz?.questionList?.length) {
      displayCurrentLeaderBoard(index);
    } else {
      setQuestionData(quiz?.questionList?.[index]);
      setCurrentQuestionIndex((prevstate) => prevstate + 1);
      let time = quiz?.questionList?.[index]?.answerTime;
      let question = {
        answerList: quiz?.questionList?.[index]?.answerList,
        questionIndex: quiz?.questionList?.[index]?.questionIndex,
        correctAnswersCount: quiz?.questionList?.[index]?.answerList.filter(
          (answer: any) => answer?.isCorrect === true
        )?.length,
      };
      console.log('question', question);
      socket.emit('start-question-timer', time, question, () => {
        startQuestionCountdown(time, index + 1);
      });
    }
  };

  return (
    <div className={styles.page}>
      {!isGameStarted && (
        <div className={styles.lobby}>
          <WaitingRoom pin={game?.result?.pin} socket={socket} />
          <button onClick={startGame}>Start a game</button>
        </div>
      )}

      {isPreviewScreen && (
        <div className={styles['question-preview']}>
          <h1>{timer}</h1>
        </div>
      )}
      {isQuestionScreen && (
        <div className={styles['question-preview']}>
          <Question
            key={questionData?.questionIndex}
            question={questionData}
            timer={timer}
            host={true}
          />
        </div>
      )}
      {isQuestionResultScreen && (
        <div className={styles['question-preview']}>
          <div className={styles['leaderboard']}>
            <h1 className={styles['leaderboard-title']}>Question result</h1>
            <ol>
              {questionResult?.questionResultList?.map((player: any) => (
                <li>
                  {playerList
                    .filter((x: any) => x.id === player?.playerId)
                    .map((x: any) => (
                      <mark>{x?.userName}</mark>
                    ))}
                  <small>{player?.playerPoints}</small>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
      {isLeaderboardScreen && (
        <div className={styles['question-preview']}>
          <div className={styles['leaderboard']}>
            <h1 className={styles['leaderboard-title']}>Leaderboard</h1>
            <ol>
              {currentLeaderboard?.leaderboardList?.map((player: any) => (
                <li>
                  {playerList
                    .filter((x: any) => x.id === player?.playerId)
                    .map((x: any) => (
                      <mark>{x.userName}</mark>
                    ))}
                  <small>{player?.playerCurrentScore}</small>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};

export default HostScreen;
