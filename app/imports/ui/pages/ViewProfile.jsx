import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Loader, Header, Container } from 'semantic-ui-react';
import { Profiles } from '/imports/api/profile/profile';
import { Notes } from '/imports/api/note/note';
import Profile from '/imports/ui/components/Profile';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListProfiles extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center" inverted>Your Profile</Header>
          <Card.Group >
            <Card fluid>
              <Card.Description>
                {this.props.profiles.map((profile, index) => <Profile key={index} profile={profile}/>)}
              </Card.Description>
            </Card>
          </Card.Group>
        </Container>

    );
  }
}

/** Require an array of Stuff documents in the props. */
ListProfiles.propTypes = {
  profiles: PropTypes.array.isRequired,
  notes: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Profile');
  const subscription2 = Meteor.subscribe('Notes');
  return {
    profiles: Profiles.find({}).fetch(),
    notes: Notes.find({}).fetch(),
    ready: (subscription.ready() && subscription2.ready()),
  };
})(ListProfiles);