import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Mates, HousemateSchema } from '/imports/api/profile/housemate';
import { withRouter } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Housemates extends React.Component {

  //Implementing deletion of profile
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  deleteCallback(error) {
    if(error) {
      Bert.alert({ type: 'danger', message: 'Delete failed: ${error.message}' });
    } else {
      Bert.alert({ type: 'success', message: 'Delete succeeded' });
    }
  }

  onClick() {
    Mates.remove(this.props.profile._id, this.deleteCallback);
  }
  //end profile deletion

  render() {
    return (
        <Card fluid>
          <Card.Content>
            <Image floated='left' size='small' src={this.props.housemate.image} />
            <Card.Header as='h1'>
              {this.props.housemate.firstName} {this.props.housemate.lastName} ({this.props.housemate.standing})
            </Card.Header>
            <Card.Header as='h3'>
              Contact:&nbsp;<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.props.housemate.contactInfo}
            </Card.Header>
            <Card.Description as='h3'>
              Description:&nbsp;<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.props.housemate.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            Preferred destinations:&nbsp; {this.props.housemate.preferredDestinations}
          </Card.Content>
          <Card.Content extra>
            <Button basic onClick={this.onClick}>Remove from Crew</Button>
          </Card.Content>
        </Card>
    );
  }
}
// Accident
/** Require a document to be passed to this component. */
Housemates.propTypes = {
  housemate: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Housemates);