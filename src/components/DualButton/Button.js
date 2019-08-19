import React from "react";
import styled from "styled-components";

export default function Button({ lightButtonOffset, darkButtonOffset }) {
  return (
    <ButtonWrapper>
      <Wrapper offset={lightButtonOffset}>
        <Content offset={lightButtonOffset}>
          <LightButton>Hire Us</LightButton>
        </Content>
      </Wrapper>
      <Wrapper offset={darkButtonOffset}>
        <Content offset={darkButtonOffset}>
          <DarkButton>Hire Us</DarkButton>
        </Content>
      </Wrapper>
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.div`
  height: 50px;
  width: 200px;
`;

const Wrapper = styled.div`
  overflow: hidden;
  position: absolute;
  transform: translate3d(0, ${props => props.offset}px, 0);
`;

const Content = styled.div`
  transform: translate3d(0, ${props => -props.offset}px, 0);
`;

const ButtonLayout = styled.div`
  height: 50px;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-weight: 600;
`;

const LightButton = styled(ButtonLayout)`
  background-color: #fff;
  color: #000;
`;

const DarkButton = styled(ButtonLayout)`
  background-color: #000;
  color: #fff;
`;
