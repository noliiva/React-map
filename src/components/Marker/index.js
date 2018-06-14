import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  height: 40px;
  width: 30px;
  transform: translate(-50%);
  background: url(${process.env.PUBLIC_URL}/pin.svg) no-repeat bottom center;
  color: #fff;
  font-weight: bold;
  font-size: 14px;

  span {
    position: relative;
    top: 8px;
  }
`;

const Marker = ({ position, index }) => (
  <Wrapper>
    <span>{index + 1}</span>
  </Wrapper>
);

export default Marker;
