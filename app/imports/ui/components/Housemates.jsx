import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Housemates extends React.Component {
  render() {
    return (
        <Card fluid>
          <Card.Content>
            <Image floated='left' size='small' src={this.props.profile.image} />
            <Card.Header as='h1'>
              {this.props.profile.firstName} {this.props.profile.lastName} ({this.props.profile.standing})
            </Card.Header>
            <Card.Description as='h3'>
              Contact:&nbsp;
              {this.props.profile.contactInfo}
            </Card.Description>
            <Card.Description as='h3'>
              Description:&nbsp;
              {this.props.profile.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            Preferred destinations:&nbsp; {this.props.profile.preferredDestinations}
          </Card.Content>
        </Card>
    );
  }
}
// Accident
/** Require a document to be passed to this component. */
Housemates.propTypes = {
  profile: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Housemates);
