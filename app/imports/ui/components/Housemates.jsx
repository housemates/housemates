import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Housemates extends React.Component {
  render() {
    return (
        <Card>
          <Card.Content>
            <Image floated='right' size='mini' src={this.props.profile.image} />
            <Card.Header>
              {this.props.profile.firstName} {this.props.profile.lastName} ({this.props.profile.standing})
            </Card.Header>
            <Card.Meta>
              {this.props.profile.address}
            </Card.Meta>
            <Card.Description>
              {this.props.profile.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            Preferred destinations: {this.props.profile.interests}
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
