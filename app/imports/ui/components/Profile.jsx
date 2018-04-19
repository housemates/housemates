import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Profile extends React.Component {
  render() {
    return (
        <Card fluid>
          <Card.Content>
            <Image floated='left' size='small' src={this.props.profile.image} />
            <Card.Header as='h1'>
              {this.props.profile.firstName} {this.props.profile.lastName} ({this.props.profile.standing})
            </Card.Header>
            <Card.Header as='h3'>
              Contact:&nbsp;
              {this.props.profile.contactInfo}
            </Card.Header>
            <Card.Description as='h3'>
              Preferred destinations:&nbsp;
              {this.props.profile.preferredDestinations}
            </Card.Description>
            <Card.Description as='h3'>
              Description:&nbsp;
              {this.props.profile.description}
            </Card.Description>
          </Card.Content>
          <Card.Content>
            <Link to={`/edit/${this.props.profile._id}`}>Edit</Link>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  notes: PropTypes.array.isRequired,
};
/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Profile);
