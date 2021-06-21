import React, { useState } from 'react';
import Slogan from '../components/Slogan';
import Map from '../components/Map';
import Questions from '../components/Questions';
import Footer from '../components/Footer';
import ScrollButton from '../components/ButtonUp';
import Container from '../components/styled/Container';
import TextAbout from '../components/TextAbout';

export default class About extends React.Component {
  render() {
    return (
      <div>
        <Container>
          <Slogan />
          <TextAbout/>
          <Map />
          <Questions />
          <Footer />
          <ScrollButton />
        </Container>
      </div>
    );
  }
}
