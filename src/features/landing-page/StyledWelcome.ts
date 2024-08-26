import styled from '~/helpers/styled-component';
import BigMoonBG from './assets/big-moon.svg';
import Clouds from './assets/clouds.png';
import SiliconValley from './assets/silicon-valley.png';
import PlaneVietnam from './assets/plane-vietnam.png';

export const Wrapper = styled.div`
  min-width: 1300px;
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
    'Open Sans', 'Helvetica Neue', sans-serif;
`;

export const FirstScene = styled.div`
  & .big-moon {
    content: '';
    position: absolute;
    z-index: 0;
    top: 0px;
    left: 0px;
    width: 100%;
    min-width: 1300px;
    min-height: 150vh;
    background: url(${BigMoonBG}) center top / 130% no-repeat;
  }

  & .main-scene {
    position: relative;
    z-index: 1;
    width: 100%;
    left: 0;
    min-height: 100vh;
    top: 0;
  }

  background: url(${Clouds}) left bottom repeat,
    linear-gradient(
      rgb(67, 96, 253),
      rgb(67, 96, 253) 48%,
      rgb(77, 175, 248) 78%,
      rgba(81, 201, 246, 0)
    ),
    url(${SiliconValley}) left bottom / 100% no-repeat;
  overflow-x: hidden;
  min-height: 100vh;
  width: 100%;

  & .header {
    width: 100%;
  }

  & .first-scene {
    display: flex;
    max-width: 1300px;
    justify-content: space-between;
    width: 100%;
    min-height: 90vh;
    margin-inline: auto;
    align-items: center;
    padding: 0 2rem;

    &--title {
      margin: 34px auto 0px;
      text-align: left;
      font-size: 54px;
      line-height: 60px;
      letter-spacing: -0.56px;
      font-weight: 600;
      width: 500px;

      & span {
        color: rgb(67, 96, 253);
        text-shadow: rgb(255 255 255) 0px 0px 10px;
      }
    }

    &--subtitle {
      font-weight: 600;
      width: 500px;
      margin-top: 25px;
      font-size: 20px;
      line-height: 28px;
    }

    &--right {
      & img {
        object-fit: cover;
        height: 550px;
        margin: 5px auto 0px;
        user-select: none;
      }
    }
  }

  & .register-free {
    width: 100%;
    height: 60px;
    background-color: #fff;
    display: flex;
    border-radius: 6px;
    box-shadow: rgb(0 0 0 / 16%) 0px 3px 20px 0px;
    padding-right: 10px;
    margin-top: 34px;

    & input {
      height: 60px;
      width: 100%;
      border: 0;
      background-color: transparent;
      padding: 0 1rem;
      font-size: 16px;

      &:focus,
      &:active {
        border: 0;
        outline: none;
      }
    }

    & .ant-form-item {
      flex: 1;
    }

    & button {
      height: 40px;
      flex: 1;
      margin-top: 10px;
      background-color: rgb(67, 96, 253);
      color: #fff;
      border-radius: 6px;
      border: 0;
      outline: none;
      cursor: pointer;
      user-select: none;
    }
  }

  & .second-scene {
    margin: 42px auto;
    display: flex;
    max-width: 1300px;
    justify-content: space-between;
    width: 100%;
    min-height: 500px;
    position: relative;
    padding: 0 2rem;

    &--left {
      width: 800px;
    }

    &--right {
      background-image: url(${PlaneVietnam});
      background-size: contain;
      background-repeat: no-repeat;
      width: 800px;
      position: absolute;
      bottom: 0;
      height: 100%;
      right: 0;
      animation: PlaneVietnamFrame 3s infinite ease-in-out;
    }

    @keyframes PlaneVietnamFrame {
      0% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-30px);
      }
      100% {
        transform: translateY(0px);
      }
    }

    &--title {
      text-shadow: rgb(0 0 0 / 50%) 1px 1px 3px;
      color: #fff;
      font-size: 42px;
      line-height: 46px;
      font-weight: bold;
    }

    &--subtitle {
      text-shadow: rgb(0 0 0 / 50%) 1px 1px 3px;
      color: #fff;
      font-size: 30px;
    }

    & ul {
      margin: 0;
      margin-left: 20px;
      margin-top: 1rem;
      padding: 0;
      & li {
        font-size: 18px;
        color: #fff;
        line-height: 30px;
      }
    }
  }
`;

export const SecondScene = styled.div`
  padding: 80px 2rem;
  & .h-title {
    color: #000;
    font-size: 36px;
    line-height: 46px;
    max-width: 900px;
    text-align: center;
    font-weight: bold;
    margin: 0 auto;
  }
  .m-auto {
    margin: 0 auto;
    text-align: center;
    max-width: 1300px;

    button {
      border: 0;
      background-color: rgb(67, 96, 253);
      color: #fff;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem 2rem;
      border-radius: 0.4rem;
      margin: 50px auto 0;
      font-weight: bold;
      cursor: pointer;
    }
  }
  img {
    width: 100%;
  }
`;
export const ThirdScene = styled.div`
  padding: 80px 2rem;
  background-color: rgb(247, 247, 247);
  & .h-title {
    color: #000;
    font-size: 36px;
    line-height: 46px;
    max-width: 900px;
    text-align: center;
    font-weight: bold;
    margin: 0 auto;
  }
  .m-auto {
    margin: 0 auto;
    text-align: center;
    max-width: 1300px;

    button {
      border: 0;
      background-color: rgb(67, 96, 253);
      color: #fff;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem 2rem;
      border-radius: 0.4rem;
      margin: 50px auto 0;
      font-weight: bold;
      cursor: pointer;
    }
  }
  .box-quote {
    display: flex;
    gap: 1rem;
    margin-top: 50px;

    &--item {
      position: relative;
      width: 100%;
      border-radius: 6px;
      padding: 1rem;
      padding-bottom: 50px;
      margin-bottom: 50px;
      display: flex;
      align-items: center;
      justify-content: flex-start;

      & ul {
        margin: 0;
        padding: 0;
        text-align: left;
        margin-left: 1rem;
        li {
          margin-bottom: 0.4rem;
        }
      }

      &:nth-child(even) {
        transform: translateY(30px);
      }

      &.orange {
        background-color: rgb(255, 137, 0);
        color: #fff;
      }
      &.indigo {
        background-color: rgb(67, 96, 253);
        color: #fff;
      }
      &.green {
        background-color: rgb(53, 213, 114);
        color: #fff;
      }
      &.pink {
        background-color: rgb(248, 64, 184);
        color: #fff;
      }
      & .author {
        position: absolute;
        bottom: -40px;
        height: 80px;
        left: 50%;
        transform: translateX(-50%);
        color: #000;
        img {
          width: 70px;
          height: 70px;
          border: 4px solid rgb(247, 247, 247);
          border-radius: 50%;
        }
      }
    }
  }

  .box-text {
    display: flex;
    gap: 2rem;
    margin-top: 80px;
    &--item {
      background-color: #ffffff;
      display: flex;
      align-items: center;
      width: calc(100% / 3);
      gap: 1rem;
      border-radius: 12px;
      padding: 1rem 2rem;
      text-align: left;

      .img {
        width: 150px;
      }
    }
  }

  img {
    width: 100%;
  }
`;

export const FourScene = styled.div`
  padding: 80px 2rem;
  background-color: rgb(67, 96, 253);
  & .h-title {
    color: #fff;
    font-size: 36px;
    line-height: 46px;
    max-width: 900px;
    text-align: center;
    font-weight: bold;
    margin: 50px auto;

    & .subtitle {
      font-size: 20px;
    }
  }
  .m-auto {
    margin: 0 auto;
    text-align: center;
    max-width: 1300px;

    button {
      border: 0;
      background-color: #ffffff;
      color: rgb(67, 96, 253);
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem 2rem;
      border-radius: 0.4rem;
      margin: 50px auto 0;
      font-weight: bold;
      cursor: pointer;
    }
  }
  img {
    width: 100%;
  }

  .learn-wrapper {
    width: 1300px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .learn-type {
    gap: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(199, 208, 254);
    padding: 0.4rem;
    border-radius: 6px;

    & label {
      & input {
        display: none;
        &:checked ~ span {
          background-color: #ffffff;
          color: rgb(67, 96, 253);
        }
      }
      & span {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 1rem;
        height: 36px;
        border-radius: 6px;
        font-weight: bold;
        line-height: 1;
      }
    }
  }
`;
