import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
`;

export const Girar = styled.div`
  /* padding-bottom: 24px; */
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      /* transform: rotate(90deg); */
      transform: rotate(360deg);
    }
  }

  width: 40px;
  height: 40px;
  margin: 0 auto;
  border-radius: 50%;
  border: 4px solid #f3f3f3;
  border-top: 4px solid ${({ theme }) => theme.colors.colorPrimary};
  /* animation: spin 1s linear infinite; */

  animation: rotate 2s linear infinite;
`;
