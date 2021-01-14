import React from 'react';
import styled from 'styled-components';

import { VscGithub } from 'react-icons/vsc';

import { URLS } from '../constants';

function Footer() {
  return (
    <Container>
      <Socials>
        <a href={URLS.GIHHUB}>
          <VscGithub />
        </a>
      </Socials>
      <p>
        Copyright ©2020
        <br />
        Dohee Kim
      </p>
      <div>
        <span>Made by DOHEE KIM</span>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 70px 80px;
  font-family: 'DM Mono', monospace;
  color: ${({theme}) => theme.orangeYellow};
  text-align: right;
  font-size: 14px;

  p {
    margin: 40px 0;
    line-height: 20px;
  }

  span {
    opacity: 0.5;
  }
`;

const Socials = styled.div`
  font-size: 30px;

  a {
    cursor: pointer;
    text-decoration: none;
    color: ${({theme}) => theme.orangeYellow};
  }
`;

export default Footer;
