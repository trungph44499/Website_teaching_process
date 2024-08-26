import {useEffect, useState} from 'react';
import {Checkbox, Button, Form} from 'antd';
import {isEqual} from 'lodash';
import * as S from './styled';
import {schedulePaidAction, schedulePaidSelector, slotAction, slotSelector} from '~/redux';
import {useDispatch, useSelector} from 'react-redux';
import {selector} from '~/redux/auth';
import Loading from '~/components/common/Loading';
const Mark = () => {
  const user = useSelector(selector.user);
  const slots = useSelector(slotSelector.selectList);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    result: {schedule},
  } = useSelector(schedulePaidSelector.selectGetTransaction);
  const [paidBookedSlots, setPaidBookedSlots] = useState<any>([]);
  const convertData = (schedule: any) => {
    return schedule.map((item: any) => ({
      day: item.day,
      slot: item.slot._id,
      is_booked: item.is_booked,
    }));
  };
  const doSomething = (obj: any, prop: any) => {
    const res = Object.assign({}, obj);
    delete res[prop];
    return res;
  };
  useEffect(() => {
    schedule && setPaidBookedSlots(convertData(schedule));
  }, [schedule]);

  const dispatch = useDispatch<any>();
  const onChange = (e: any) => {
    const item = e.target.value;
    const hasPaidBooked = paidBookedSlots.find((i: any) => {
      return isEqual(item, doSomething(i, 'is_booked'));
    });
    if (hasPaidBooked) {
      const newPaidBooked = paidBookedSlots.filter((i: any) => {
        return !isEqual(item, doSomething(i, 'is_booked'));
      });
      setPaidBookedSlots(newPaidBooked);
    } else {
      setPaidBookedSlots([...paidBookedSlots, item]);
    }
  };

  const configHeader = [
    {vi: 'Ca dạy'},
    {vi: 'Thứ hai', en: 'monday'},
    {vi: 'Thứ ba', en: 'tuesday'},
    {vi: 'Thứ tư', en: 'wednesday'},
    {vi: 'Thứ năm', en: 'thursday'},
    {vi: 'Thứ sáu', en: 'friday'},
    {vi: 'Thứ bảy', en: 'saturday'},
    {vi: 'Chủ nhật', en: 'sunday'},
  ];

  const handleSubmit = () => {
    const data = {
      params: {
        _id: user?._id,
        paidBookedSlots: paidBookedSlots,
      },
    };
    dispatch(schedulePaidAction.update(data));
  };

  const initValueChecked = (value: any) => {
    const check = paidBookedSlots.find((item: any) => {
      return isEqual(doSomething(item, 'is_booked'), value);
    });
    return !!check;
  };

  const checkDisable = (value: any) => {
    const paidSlot = paidBookedSlots.find((item: any) => {
      return isEqual(doSomething(item, 'is_booked'), value);
    });
    return paidSlot ? paidSlot.is_booked : false;
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await dispatch(slotAction.fetch({}));
      await dispatch(schedulePaidAction.read({params: user?._id}));
      setLoading(false);
    })();
  }, []);

  return (
    <S.Wrapper>
      <S.Footer>
        <Button type='primary' onClick={handleSubmit}>
          Đăng ký ca
        </Button>
      </S.Footer>
      <S.Header>
        {configHeader.map((item, index) => (
          <S.HeaderItem key={index}>{item.vi}</S.HeaderItem>
        ))}
      </S.Header>
      <Form>
        {loading ? (
          <Loading />
        ) : (
          <S.Main>
            {slots?.result?.map((slot: any, index: number) => (
              <S.Row key={index}>
                {configHeader.map((day, index) => (
                  <S.MainItem key={index}>
                    {index === 0 ? (
                      slot.text
                    ) : (
                      <Form.Item
                        name={`checkbox${day.en}${slot._id}`}
                        valuePropName='checked'
                        initialValue={initValueChecked({day: day.en, slot: slot._id})}
                      >
                        <Checkbox
                          value={{slot: slot._id, day: day.en}}
                          onChange={onChange}
                          disabled={checkDisable({day: day.en, slot: slot._id})}
                        />
                      </Form.Item>
                    )}
                  </S.MainItem>
                ))}
              </S.Row>
            ))}
          </S.Main>
        )}
      </Form>
    </S.Wrapper>
  );
};

export default Mark;
