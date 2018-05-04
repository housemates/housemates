import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import { Mates, HousemateSchema } from '/imports/api/profile/housemate';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Profile extends React.Component {
//Implementing deletion of profile
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  insertCallback(error) {
    if(error) {
      Bert.alert({ type: 'danger', message: 'Add failed: ${error.message}' });
    } else {
      Bert.alert({ type: 'success', message: 'Add succeeded' });
    }
  }

  onClick() {
    Mates.insert(this.props.profile._id, this.insertCallback);
  }
  //end profile add

  render() {
    return (
        <Card fluid>
          <Card.Content>
            <Image floated='left' size='small' src={this.props.profile.image} />
            <Card.Header as='h1'>
              {this.props.profile.firstName} {this.props.profile.lastName} ({this.props.profile.standing})
            </Card.Header>
            <Card.Header as='h3'>
              Contact:&nbsp;<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.props.profile.contactInfo}
            </Card.Header>
            <Card.Description as='h3'>
              Preferred destinations:&nbsp;<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.props.profile.preferredDestinations}
            </Card.Description>
            <Card.Description as='h3'>
              Description:&nbsp;<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.props.profile.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button basic onClick={this.onClick}>Remove from Crew</Button>
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
