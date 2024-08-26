import styled from '~/helpers/styled-component';

export const Wrapper = styled.div`
  min-height: 100px;
  background-color: #ffffff;
  & .main-content {
    width: 1300px;
    margin: 0 auto;
    display: flex;
    padding: 50px 0;

    & .footer--item {
      flex: 1;
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        li.title {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 1rem;
        }
        li {
          margin-bottom: 0.4rem;
        }
      }
    }
  }

  & .main-bottom {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20px;
    font-size: 13px;
    color: rgb(97, 97, 97);
    text-align: center;
    background-color: rgb(245, 248, 248);
  }
`;
