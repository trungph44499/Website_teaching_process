import {Card, Col, Row, Select} from 'antd';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';
import {useEffect, useState} from 'react';
import {Bar, Line} from 'react-chartjs-2';
import api from '~/api';
import Loading from '~/components/common/Loading';
import getEnvVars from '~/helpers/environment';
import CountData from './components/CountData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
    },
  },
};

const env = getEnvVars();

const defaultValue: ChartData<any> = {
  labels: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],
  datasets: [],
};

const yearNow = new Date().getFullYear();

const AdminHome = () => {
  const [course, setCourse] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [statisticYear, setStatisticYear] = useState<number>(yearNow);
  const [income, setIncome] = useState<ChartData<any>>(defaultValue);
  const [dashboard, setDashboard] = useState<ChartData<any>>(defaultValue);

  useEffect(() => {
    setLoading(true);
    api.caller.get(`${env.API_URL}/v1/dashboard?year=${statisticYear}&use=admin`).then((res) => {
      const statistic = res.data.statistic;
      const labels = Object.keys(statistic.income);
      setCourse(statistic.course);
      setIncome({
        labels,
        datasets: [
          {
            fill: true,
            label: 'Danh thu',
            data: labels.map((key) => statistic.income[key]),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      });
      setDashboard({
        labels,
        datasets: [
          {
            label: 'Đơn đăng ký',
            data: labels.map((key) => statistic.orders[key]),
            backgroundColor: 'rgba(0, 255, 157, 0.5)',
          },
          {
            label: 'Học sinh',
            data: labels.map((key) => statistic.students[key]),
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
          },
          {
            label: 'Giáo viên',
            data: labels.map((key) => statistic.teachers[key]),
            backgroundColor: 'rgba(255, 0, 221, 0.5)',
          },
          {
            label: 'Nhân viên',
            data: labels.map((key) => statistic.users[key]),
            backgroundColor: 'rgba(255, 174, 0, 0.5)',
          },
        ],
      });
      setLoading(false);
    });
  }, [statisticYear]);

  const listYear = (() => {
    const listYear = [];
    let i = yearNow;
    while (i >= 2020) {
      listYear.push(i);
      i--;
    }
    return listYear;
  })();

  return (
    <Card>
      <div style={{display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16}}>
        <div>Thống kê năm:</div>
        <Select defaultValue={statisticYear} onChange={(e) => setStatisticYear(e)}>
          {listYear.map((item) => (
            <Select.Option key={item}>{item}</Select.Option>
          ))}
        </Select>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <Row gutter={24}>
          <Col span={24} style={{marginBottom: 16}}>
            <CountData />
          </Col>
          <Col span={12}>
            <Row gutter={24}>
              <Col span={12}>
                <Card
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <h3>Tổng số khoá học</h3>
                  <h2 style={{margin: 0, textAlign: 'center'}}>{course}</h2>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Line options={options} data={income} />
          </Col>
          <Col span={24}>
            <Bar options={options} data={dashboard} />
          </Col>
        </Row>
      )}
    </Card>
  );
};

export default AdminHome;
