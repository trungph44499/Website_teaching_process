import {Select} from 'antd';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {schedulePaidAction, schedulePaidSelector} from '~/redux';
import {selector} from '~/redux/auth';
import * as S from './styled';
type Props = {};
const {Option} = Select;
const PaidBookedSlots = (props: Props) => {
  const dispatch = useDispatch<any>();
  const paidBookedSLots = useSelector(schedulePaidSelector.selectGetTransaction);
  const user = useSelector(selector.user);

  useEffect(() => {
    dispatch(schedulePaidAction.read({params: user?._id}));
  }, []);
  const handleChangeSelected = (e: any) => {
    // TODO
  };
  return (
    <S.Wrapper>
      <Select style={{width: 200}} onChange={handleChangeSelected}>
        {paidBookedSLots.result.paidBookedSlots &&
          paidBookedSLots.result.paidBookedSlots.map((item: any) => (
            <Option value={item._id} key={item._id}>
              Thời gian: {item.slot.text}
            </Option>
          ))}
      </Select>
    </S.Wrapper>
  );
};

export default PaidBookedSlots;
