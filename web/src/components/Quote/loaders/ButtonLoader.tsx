import styled, { keyframes } from "styled-components";

const loadingRing = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
`;

const Loader = styled.div`
  display: inline-block;
  position: relative;
  width: 1rem;
  height: 1rem;
  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 0.8rem;
    height: 0.8rem;
    margin: 1.5px;
    border: 1.5px solid ${({ theme }) => theme.colors.brand};
    border-radius: 50%;
    animation: ${loadingRing} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${({ theme }) => theme.colors.text1} transparent transparent
      transparent;
  }
  div:nth-child(1) {
    animation-delay: -0.45s;
  }
  div:nth-child(2) {
    animation-delay: -0.3s;
  }
  div:nth-child(3) {
    animation-delay: -0.15s;
  }
`;

export function ButtonLoader() {
  return (
    <Loader>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </Loader>
  );
}
