import {Breadcrumb} from 'antd';
import TitlePage from '~/components/TitlePage';
import {HomeOutlined} from '@ant-design/icons';
import {Wrapper} from './styled';
import {useNavigate} from 'react-router-dom';

interface BreadcrumbItem {
  text: string;
  link?: string;
}
interface PropsType {
  title: string;
  breadcrumb?: BreadcrumbItem[];
}
const HeaderPage = (props: PropsType) => {
  const navigate = useNavigate();
  const goToPage: any = (link: string) => {
    navigate(link);
  };
  return (
    <Wrapper>
      <TitlePage content={props.title} />
      {props.breadcrumb && (
        <Breadcrumb>
          <Breadcrumb.Item href=''>
            <HomeOutlined />
          </Breadcrumb.Item>
          {props.breadcrumb.map((item: any, index: number) => {
            return (
              <Breadcrumb.Item key={index} onClick={() => goToPage(item?.link)}>
                <span>{item.text}</span>
              </Breadcrumb.Item>
            );
          })}
        </Breadcrumb>
      )}
    </Wrapper>
  );
};

export default HeaderPage;
