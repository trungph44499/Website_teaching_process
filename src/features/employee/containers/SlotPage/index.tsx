import {useEffect, useState} from 'react';
import * as S from './styled';
import {TimePicker} from 'antd';
import type {Moment} from 'moment';
import {
  AiOutlineClockCircle,
  AiOutlineEdit,
  AiFillCloseCircle,
  AiOutlineRollback,
} from 'react-icons/ai';
import {useAppSelector} from '~/redux/store';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {slotAction, slotSelector} from '~/redux';
import withAuth from '~/helpers/withAuth';
import HeaderPage from '~/components/common/HeaderPage';
import Loading from '~/components/common/Loading';

type SlotPageProps = {};

const SlotPage = (props: SlotPageProps) => {
  const dispatch = useDispatch<any>();
  const slotStore = useAppSelector(slotSelector.selectList);

  const [valueTime, setValueTime] = useState<[Moment, Moment] | null>();
  const [id, setId] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const fomartTime = (time: Date, typeFormat: string) => {
    return moment(time).format(typeFormat);
  };
  const getTime = async (time: any, timeString: [string, string]) => {
    const start = time[0]._d;
    const end = time[1]._d;
    const text = fomartTime(start, 'HH:mm') + ' - ' + fomartTime(end, 'HH:mm');
    if (valueTime) {
      await dispatch(slotAction.update({params: {_id: id, text, start, end}}));
      setValueTime(null);
      return;
    }
    await dispatch(slotAction.create({params: {text, start, end}}));
  };
  const getSlotById = async (id: string) => {
    setLoading(true);
    const {payload} = await dispatch(slotAction.read({params: id}));
    setId(id);
    setValueTime([moment(payload.start), moment(payload.end)]);
    setLoading(false);
  };
  const removeSlotEl = async (id: string) => {
    await dispatch(slotAction.remove({params: id}));
  };
  const backToCreate = () => {
    setValueTime(null);
  };
  useEffect(() => {
    dispatch(slotAction.fetch({}));
  }, []);
  return (
    <S.Wrapper>
      <HeaderPage title='Quản lý ca học' breadcrumb={[{text: 'Danh sách ca học'}]} />
      <div>
        <div>{valueTime ? 'Cập nhật slot:' : 'Tạo slot mới:'}</div>
        {loading ? (
          <Loading height='20px' />
        ) : (
          <TimePicker.RangePicker
            format={'HH:mm'}
            minuteStep={5}
            value={valueTime}
            placeholder={['Giờ bắt đầu', 'Giờ kết thúc']}
            onChange={getTime}
          />
        )}
        {valueTime && (
          <S.ButtonBack onClick={backToCreate}>
            Quay lại tạo mới <AiOutlineRollback />
          </S.ButtonBack>
        )}
      </div>
      <S.ListTimeCreated>
        <h4>Danh sách slot: </h4>
        {slotStore.loading ? (
          <Loading />
        ) : (
          slotStore.result &&
          slotStore.result.map((item: any) => (
            <S.ElementTime key={item._id}>
              <AiOutlineClockCircle /> {item.text}
              <AiOutlineEdit onClick={() => getSlotById(item._id)} />
              <AiFillCloseCircle onClick={() => removeSlotEl(item._id)} />
            </S.ElementTime>
          ))
        )}
      </S.ListTimeCreated>
    </S.Wrapper>
  );
};

export default withAuth(SlotPage, 'create');
