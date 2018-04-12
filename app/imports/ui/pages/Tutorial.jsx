import React from 'react';
import { Grid, Icon, Header } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div className='landing-background'>
          <Grid container centered stackable rows={2} verticalAlign='center'>
            <Grid.Row textAlign='center'>
              <Header as 'h1' inverted>Overview</Header>
              <Header as 'h3' inverted>House Mates is an application for U.H. users trying to find roommates and/or off-campus housing.</Header>
            </Grid.Row>
            <Grid.Row textAlign='center'>
              <Grid container centered stackable columns={3} verticalAlign='center'>
                <Grid.Column>
                  <Header as 'h1' inverted>Signing In/Up</Header>
                  <Header as 'h3' inverted>To get started, sign up with a registered U.H. email and create your own password. You will use these credentials to access your profile on the application.</Header>
                </Grid.Column>
                <Grid.Column>
                  <Header as 'h1' inverted>Creating Your Profile</Header>
                  <Header as 'h3' inverted>After signing in or signing up, you may create your public profile by selecting "Create Profile" in the navigation bar. After the creation, you may view your profile and edit it with the "View Profile" option.</Header>
                </Grid.Column>
                <Grid.Column>
                  <Header as 'h1' inverted>Basic Usage</Header>
                  <Header as 'h3' inverted>By creating your profile, you can also "Search" through other registered users for potential roommates, you may filter your searches based on profile content such as their preferred locations, class standings, etc. After connecting to these users, you may view them in the navigation bar's "View Your Crew" option, and remove any users you no longer wish to be connected to.</Header>
                </Grid.Column>
              </Grid>
            </Grid.Row>
          </Grid>
        </div>
    );
  }
}

export default Landing;
