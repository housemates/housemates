import _ from 'lodash';
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader, Search, Label, Dropdown } from 'semantic-ui-react';
import { Profiles } from '/imports/api/profile/profile';
import { Notes } from '/imports/api/note/note';
import Housemates from '/imports/ui/components/Housemates';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

const searchOptions = [
    { text: 'First Name',
      value: 'firstName' },

    { text: 'Last Name',
      value: 'lastName' },

    { text: 'Interests',
      value: 'interests' }];

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListHousemates extends React.Component {

  componentWillMount() {
    this.resetComponent();
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' });

  handleResultSelect = (e, { result }) => this.setState({ value: result.value });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = result =>
        re.test(result.interests);
     /*   if (searchOptions.value === 'firstName') {
          re.test(result.firstName);
        }
        else if (searchOptions.value === 'lastName') {
          re.test(result.lastName);
        }
        else if (searchOptions.value === 'interests') {
          re.test(result.interests);
        }
        else { */
       //   re.test(result.interests);
        // }


      this.setState({
        isLoading: false,
        results: _.filter(this.props.profiles, isMatch),
      });
    }, 300);
  };

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const resultRenderer = ({ firstName }) =>
        <Label color='blue' content={firstName} tag/>;

    resultRenderer.propTypes = {
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      address: PropTypes.string,
      image: PropTypes.string,
      description: PropTypes.string,
      interests: PropTypes.string,
      standing: PropTypes.string,
    };
    const { isLoading, value, results } = this.state;
    return (
        <Container>
          <Header as="h2" textAlign="center" inverted>List Housemates</Header>
          <Dropdown placeholder='Filter Search' selection options={searchOptions}/>
          <Search
              loading={isLoading}
              onResultSelect={this.handleResultSelect}
              onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
              results={results}
              value={value}
              resultRenderer={resultRenderer}
              {...this.props}
          />
          <Card.Group>
            {this.props.profiles.map((profile, index) => <Housemates key={index} profile={profile}/>)}
          </Card.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListHousemates.propTypes = {
  profiles: PropTypes.array.isRequired,
  notes: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Profiles');
  const subscription2 = Meteor.subscribe('Notes');
  return {
    profiles: Profiles.find({}).fetch(),
    notes: Notes.find({}).fetch(),
    ready: (subscription.ready() && subscription2.ready()),
  };
})(ListHousemates);
