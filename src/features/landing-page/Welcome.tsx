import Header from './components/Header';
import * as S from './StyledWelcome';
import BannerTop from './assets/banner-vietnam.png';
import JourneyVietNam from './assets/journey-vietnam.png';
import Interview from './assets/interview.svg';
import Report from './assets/report.svg';
import Training from './assets/training.svg';
import {Form} from 'antd';
import {Link} from 'react-router-dom';
import Footer from './components/Footer';

const Welcome = () => {
  return (
    <S.Wrapper>
      <S.FirstScene>
        <div className='big-moon'></div>
        <div className='main-scene'>
          <div className='header'>
            <Header />
          </div>
          <div className='first-scene'>
            <div className='first-scene--left'>
              <div className='first-scene--title'>
                Trang bị cho <br /> con bạn năng lực <br />
                <span>Lập trình & tư duy toán học</span>
              </div>
              <div className='first-scene--subtitle'>
                Trực tiếp 1:1, lớp học các công nghệ thông minh nhất cho con bạn từ lớp 1-12
              </div>
              <Form className='register-free'>
                <Form.Item name='email' rules={[{required: true, message: 'Vui lòng điền email'}]}>
                  <input placeholder='Email của bạn' />
                </Form.Item>
                <button type='submit'>Đăng ký học thử miễn phí</button>
              </Form>
            </div>
            <div className='first-scene--right'>
              <img src={BannerTop} alt='Banner Vietnam' draggable='false' />
            </div>
          </div>
          <div className='second-scene'>
            <div className='second-scene--left'>
              <div className='second-scene--title'>Tại sao nên lập trình?</div>
              <div className='second-scene--subtitle'>
                Lập trình dạy cho con trẻ nhiều kỹ năng sống như
              </div>
              <ul>
                <li>
                  Sáng tạo: viết chương trình, thuyết trình, tạo ảnh động và game ... , bồi dưỡng
                  năng lực sáng tạo
                </li>
                <li>
                  Kĩ năng giải quyết vấn đề: Chia nhỏ vấn đề ra để giải quyết từng khía cạnh của vấn
                  đề.
                </li>
                <li>
                  Tư duy logic: học cách suy nghĩ một cách có hệ thống và theo trình tự từ đó suy
                  luận, bởi vì nếu có một đoạn trong hệ thống sai sẽ dẫn đến sai toàn bộ.
                </li>
              </ul>
            </div>
            <div className='second-scene--right'></div>
          </div>
        </div>
      </S.FirstScene>
      <S.SecondScene>
        <div className='h-title'>
          Chuyến hành trình của bé để trở thành nhà sáng tạo công nghệ và tài năng toán học
        </div>
        <div className='m-auto'>
          <img src={JourneyVietNam} alt='' />
          <Link to='/'>
            <button>Hãy tham gia lớp học từ những chuyên gia giảng viên của chúng tôi</button>
          </Link>
        </div>
      </S.SecondScene>
      <S.ThirdScene>
        <div className='h-title'>
          Nơi tốt nhất/Chuyên gia giỏi nhất để khai phóng tiềm năng của bé
        </div>
        <div className='m-auto'>
          <div className='box-quote'>
            <div className='box-quote--item indigo'>
              <ul>
                <li>Trường đại học kỹ thuật công lập ở Ấn Độ</li>
                <li>Nhà huấn luyện chương trình STEM</li>
                <li>Nhà vô địch của cuộc thi Không Gian Mạng Quốc Gia</li>
                <li>Nhà lập trình được giải cao nhất trong cuộc thi lập trình Hackathon</li>
              </ul>
              <div className='author'>
                <img
                  src='https://static.vecteezy.com/system/resources/thumbnails/004/511/281/small/default-avatar-photo-placeholder-profile-picture-vector.jpg'
                  alt=''
                />
                <div>Kieu Van Chuong</div>
              </div>
            </div>
            <div className='box-quote--item orange'>
              <ul>
                <li>
                  Người hướng dẫn và lập trình về trí tuệ nhân tạo với kiến thức trải rộng đa nền
                  tảng
                </li>
                <li>Kỹ sư khoa học máy tính với học thuật vững chắc</li>
                <li>Thành thạo các ngôn ngữ Mango, C#, Java, Python</li>
              </ul>
              <div className='author'>
                <img
                  src='https://static.vecteezy.com/system/resources/thumbnails/004/511/281/small/default-avatar-photo-placeholder-profile-picture-vector.jpg'
                  alt=''
                />
                <div>Kieu Van Chuong</div>
              </div>
            </div>
            <div className='box-quote--item green'>
              <ul>
                <li>Chuyên gia về dữ liệu lớn</li>
                <li>Huấn luyện viên về công nghệ nâng cao (Hadoop and HBase)</li>
                <li>Diễn giả đến từ trường Cao đẳng kỹ thuật HKBK</li>
              </ul>
              <div className='author'>
                <img
                  src='https://static.vecteezy.com/system/resources/thumbnails/004/511/281/small/default-avatar-photo-placeholder-profile-picture-vector.jpg'
                  alt=''
                />
                <div>Kieu Van Chuong</div>
              </div>
            </div>
            <div className='box-quote--item pink'>
              <ul>
                <li>Người sáng lập của 2 công ty khởi nghiệp</li>
                <li>Giảng viên của India Fellow </li>
                <li>Đã thiết kế giáo trình STEM</li>
              </ul>
              <div className='author'>
                <img
                  src='https://static.vecteezy.com/system/resources/thumbnails/004/511/281/small/default-avatar-photo-placeholder-profile-picture-vector.jpg'
                  alt=''
                />
                <div>Kieu Van Chuong</div>
              </div>
            </div>
          </div>
          <div className='box-text'>
            <div className='box-text--item'>
              <div className='img'>
                <img src={Training} alt='Training' />
              </div>
              <div className='text'>
                Tât cả các chuyên gia giảng viên này đều được huấn luyện qua một chương trình được
                thiết kế đặc biệt để đảm bảo rằng tất cả các bé đều có niềm đam mê sáng tạo học tập
                cao nhất.
              </div>
            </div>
            <div className='box-text--item'>
              <div className='img'>
                <img src={Interview} alt='Interview' />
              </div>
              <div className='text'>
                Các giảng viên được chọn từ quá trình phỏng vấn nghiêm ngặt. Chúng tôi chỉ chọn được
                một trong số 100 ứng viên ứng tuyển.
              </div>
            </div>
            <div className='box-text--item'>
              <div className='img'>
                <img src={Report} alt='Report' />
              </div>
              <div className='text'>
                Các giảng viên sẽ làm một bản tường trình báo cáo chi tiết về quá trình học của học
                viên sau mỗi 4 buổi dạy.
              </div>
            </div>
          </div>
          <Link to='/'>
            <button>Hãy tham gia lớp học từ những chuyên gia giảng viên của chúng tôi</button>
          </Link>
        </div>
      </S.ThirdScene>
      <S.FourScene>
        <Form>
          <Form.Item className='learn-wrapper' name='learn-type'>
            <div className='learn-type'>
              <label>
                <input type='radio' name='learn-type' defaultValue={1} defaultChecked={true} />
                <span>Học cá nhân</span>
              </label>
              <label>
                <input type='radio' name='learn-type' defaultValue={2} />
                <span>Học nhóm</span>
              </label>
            </div>
          </Form.Item>
          <div className='h-title'>
            Chương trình học mang tính sáng tạo đổi mới nhất với mục tiêu các bé sẽ tư duy thông
            minh trong lĩnh vực Khoa học Công nghệ và Toán học
            <div className='subtitle'>(Sử dụng những kỹ thuật lập trình)</div>
          </div>
          <Form.Item className='learn-wrapper' name='learn-option'>
            <div className='learn-type'>
              <label>
                <input type='radio' name='learn-option' defaultValue={1} defaultChecked={true} />
                <span>Bé từ lớp 1 - 3</span>
              </label>
              <label>
                <input type='radio' name='learn-option' defaultValue={2} />
                <span>Bé từ lớp 4 - 6</span>
              </label>
              <label>
                <input type='radio' name='learn-option' defaultValue={3} />
                <span>Bé từ lớp 7 trở lên</span>
              </label>
            </div>
          </Form.Item>
          <div className='m-auto'>
            <Link to='/'>
              <button>Hãy tham gia lớp học từ những chuyên gia giảng viên của chúng tôi</button>
            </Link>
          </div>
        </Form>
      </S.FourScene>
      <Footer />
    </S.Wrapper>
  );
};

export default Welcome;
