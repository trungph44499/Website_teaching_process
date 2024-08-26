import * as S from './styled';
import MainLogo from '~/components/common/Logo/MainLogo';

const Footer = () => {
  return (
    <S.Wrapper>
      <div className='main-content'>
        <div className='footer--item'>
          <MainLogo width={200} />
        </div>
        <div className='footer--item'>
          <ul>
            <li className='h-title'>Công ty</li>
            <li>Trang chủ</li>
            <li>Giới thiệu</li>
            <li>Chương trình</li>
            <li>Blog</li>
            <li>Mã hóa</li>
            <li>Bootcamps</li>
            <li>Đội Siêu Đẳng</li>
            <li>Nhận xét</li>
            <li>Trả bằng mã giảm giá</li>
            <li>Chi tiết tài khoản</li>
          </ul>
        </div>
        <div className='footer--item'>
          <ul>
            <li className='h-title'>Trang chủ</li>
            <li>Điều khoản và điều kiện người sử dụng</li>
            <li>Điều khoản và điều kiện nhà cung cấp</li>
            <li>Chính sách riêng tư người dùng</li>
            <li>Chính sách riêng tư cho nhà cung cấp</li>
            <li>Chính sách Hủy và hoàn tiền</li>
            <li>Điều khoản miễn trừ trách nhiệm</li>
          </ul>
        </div>
      </div>
      <div className='main-bottom'>
        <div className='bottom'>
          INDONESIA - AXA TOWER 45TH FLOOR, JL PROF. DR. SATRIO KAV. 18, Kel. Karet Kuningan, Kec.
          Setiabudi, Kota Adm. Jakarta Selatan, Prov. DKI Jakarta
          <br />
          INDIA – H.No. 8-2-699/1, SyNo. 346, Rd No. 12, Banjara Hills, Hyderabad, Telangana –
          500034
          <br />
          SINGAPORE – 60 Paya Lebar Road#05-16, Paya Lebar Square Singapore (409051)
          <br />
          USA: 251, Little Falls Drive, Wilmington, Delaware 19808
          <a href='email:support@brightchamps.com'>Email us at support@brightchamps.com</a>
          <br />
          <span>© Copyright 2022 BrightChamps</span>
        </div>
      </div>
    </S.Wrapper>
  );
};

export default Footer;
