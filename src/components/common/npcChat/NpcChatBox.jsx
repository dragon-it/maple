import React from "react";
import styled from "styled-components";


export const NpcChatBox = ({ text }) => {
  return (
    <ChatBoxWrapper>
      <div className="arrow_box">{text}</div>
    </ChatBoxWrapper>
  );
};

const ChatBoxWrapper = styled.div`
  .arrow_box {
    position: relative;
    background: rgb(253, 253, 254);
    background: radial-gradient(
      circle,
      rgba(253, 253, 254, 1) 77%,
      rgba(192, 204, 216, 1) 100%
    );
    color: rgb(81, 21, 25);
    border: 1px solid rgb(0, 4, 14);
    padding: 10px;
    border-radius: 10px;
    text-align: center;
    max-width: 150px;
    word-wrap: break-word;
  }

  .arrow_box:after,
  .arrow_box:before {
    top: 100%;
    left: 50%;
    border: solid transparent;
    content: "";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  .arrow_box:after {
    border-color: rgba(255, 255, 255, 0);
    border-top-color:rgb(255, 255, 255);
    border-width: 10px;
    margin-left: -10px;
  }
  .arrow_box:before {
    border-color: rgba(0, 4, 14, 0);
    border-top-color:rgb(0, 4, 14);
    border-width: 11px;
    margin-left: -11px;
  }
`;