import styled from '~/helpers/styled-component';

export const Wrapper = styled.div`
  width: 100%;
  padding: 1rem;
  background-color: #ffff;
`;

export const ListTimeCreated = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
  margin-top: 20px;
  h4 {
    width: 100%;
  }
`;

export const ElementTime = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
  border: 1px solid ${({theme}) => theme.color.primary};
  border-radius: 4px;
  padding: 5px;
`;
export const ButtonBack = styled.button`
  margin-top: 10px;
  display: flex;
  align-items: center;
`;
