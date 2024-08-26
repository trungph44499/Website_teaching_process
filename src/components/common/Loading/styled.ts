import styled from 'styled-components';
interface LoadingWrapperProps {
  height?: string;
}
export const LoadingWrapper = styled.div<LoadingWrapperProps>`
  width: 100%;
  min-height: ${(props: any) => props.height || '200px'};
  display: flex;
  justify-content: center;
  align-items: center;
`;
