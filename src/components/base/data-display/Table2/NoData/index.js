import React from "react";
import styled from "styled-components";
import Button from "../../../common/Button";

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 80%;
  background: white;
  text-align: center;
`;



function NoData() {
  return (
    <Container>
      <div style={{ position:"absolute", left: "50%", top: "50%", transform: "translate3d(-50%, -50%, 0)" }}>
        <p>데이터가 없습니다</p>
        <Button>아이템 생성</Button>
      </div>
    </Container>
  );
}

NoData.propTypes = {};

export default NoData;
