import React from 'react';
import { Grid, Icon, Header } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Tutorial extends React.Component {
  render() {
    return (
        <div className='landing-background-2'>
          <Grid container centered stackable rows={2} verticalAlign='center'>
            <Grid.Row textAlign='center'>
              <Grid container centered stackable columns={3} verticalAlign='center'>
                <Grid.Column>
                  <Header as='h1' inverted>Signing In/Up</Header>
                  <Header as='h3' inverted>To get started, sign up with a registered U.H. email and create your own password. You will use these credentials to access your profile on the application.</Header>
                </Grid.Column>
                <Grid.Column>
                  <Header as='h1' inverted>Basic Usage</Header>
                  <Header as='h3' inverted>You can also 'Search' through other registered users for potential roommates, you may filter your searches based on profile content such as their preferred locations. You may view these connections or remove them in the navigation bar's 'View Your Crew' option.</Header>
                </Grid.Column>
                <Grid.Column>
                  <Header as='h1' inverted>Creating Your Profile</Header>
                  <Header as='h3' inverted>After signing in or signing up, you may create your public profile by selecting 'Create Profile'. After the creation, you may view and edit your profile with the 'View Profile' option.</Header>
                </Grid.Column>
              </Grid>
            </Grid.Row>
          </Grid>
        </div>
    );
  }
}

export default Tutorial;
