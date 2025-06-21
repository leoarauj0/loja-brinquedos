import styled from "styled-components";

export const Container = styled.div`
  margin-right: 10px;

  @media (max-width: 780px) {
    margin-right: 0;
  }
`;

export const Wrapper = styled.div`
  display: flex;

  background: ${(props) => props.theme.colors.PrimaryGradiente};

  border-radius: 20px 0 0 20px;
  height: 100vh;

  @media (max-width: 780px) {
  }
`;
