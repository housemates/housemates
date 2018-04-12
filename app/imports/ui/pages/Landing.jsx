import React from 'react';
import { Grid, Icon, Header } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div className='landing-background'>
          <Grid container centered stackable columns={2} verticalAlign = 'center'>
            <Grid.Column textAlign='center'>
              <Icon size='huge' name='user' inverted/>
              <Header as='h1' inverted>First Mates</Header>
              <Header as='h3' inverted>The island of Oahu is full of potential roommates. Keep track of your Ship and the mates on board as you decide your next destination.</Header>
            </Grid.Column>

            <Grid.Column textAlign='center'>
              <Icon size='huge' name='search' inverted/>
              <Header as='h1' inverted>Land Ho</Header>
              <Header as='h3' inverted>Search the seas for other adventurers. Build your crew, view their preferred locations and interests, and journey with them to your next home!</Header>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

export default Landing;
