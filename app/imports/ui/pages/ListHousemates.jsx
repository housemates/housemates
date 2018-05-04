import _ from 'lodash';
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader, Search, Label, Dropdown } from 'semantic-ui-react';
import { Mates } from '/imports/api/profile/housemate';
import { Notes } from '/imports/api/note/note';
import Housemates from '/imports/ui/components/Housemates';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

// Provides the search filter options for the dropdown menu
const searchOptions = [
    { text: 'First Name',
      value: 'firstName' },

    { text: 'Last Name',
      value: 'lastName' },

    { text: 'Interests',
      value: 'interests' },

    { text: 'Preferred Destinations',
      value: 'preferredDestinations' },

    { text: 'Standing',
      value: 'standing' }];

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListHousemates extends React.Component {

  componentWillMount() {
    this.resetComponent();
  }

  // Sets the value of this.state.filter to the value selected in the dropdown menu
  handleDropdownChange = (e, { value }) => this.setState({ filter: value })

  // Resets the search-dependent values of this.state
  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' });

  // Sets this.state.value to the value obtained from the search function
  handleResultSelect = (e, { result }) => this.setState({ value: result.value });

  // Sets this.state.results to the profile value that matches the search text
  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    // Search filter is set to "First Name"
    if (this.state.filter === 'firstName') {
      setTimeout(() => {
        if (this.state.value.length < 1) return this.resetComponent();

        const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
        const isMatch = result => re.test(result.firstName);

        this.setState({
          isLoading: false,
          results: _.filter(this.props.profiles, isMatch),
        });
      }, 300);
    }

    // Search filter is set to "Last Name"
    else if (this.state.filter === 'lastName') {
      setTimeout(() => {
        if (this.state.value.length < 1) return this.resetComponent();

        const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
        const isMatch = result => re.test(result.lastName);

        this.setState({
          isLoading: false,
          results: _.filter(this.props.profiles, isMatch),
        });
      }, 300);
    }

    // Search filter is set to "Interests"
    else if (this.state.filter === 'interests') {
        setTimeout(() => {
          if (this.state.value.length < 1) return this.resetComponent();

          const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
          const isMatch = result => re.test(result.interests);

          this.setState({
            isLoading: false,
            results: _.filter(this.props.profiles, isMatch),
          });
        }, 300);
      }

      // Search filter is set to "Preferred Destinations"
      else if (this.state.filter === 'preferredDestinations') {
          setTimeout(() => {
            if (this.state.value.length < 1) return this.resetComponent();

            const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
            const isMatch = result => re.test(result.preferredDestinations);

            this.setState({
              isLoading: false,
              results: _.filter(this.props.profiles, isMatch),
            });
          }, 300);
        }

        // Search filter is set to "Standing"
        else if (this.state.filter === 'standing') {
            setTimeout(() => {
              if (this.state.value.length < 1) return this.resetComponent();

              const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
              const isMatch = result => re.test(result.standing);

              this.setState({
                isLoading: false,
                results: _.filter(this.props.profiles, isMatch),
              });
            }, 300);
          }

      // If no value set for the search filter, the filter is automatically set to "Preferred Destinations"
      else {
        setTimeout(() => {
          if (this.state.value.length < 1) return this.resetComponent();

          const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
          const isMatch = result => re.test(result.preferredDestinations);


          this.setState({
            isLoading: false,
            results: _.filter(this.props.profiles, isMatch),
          });
        }, 300);
      }
  };

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const resultRenderer = ({ firstName, lastName }) =>
        <Label color='blue' content={firstName + ' ' + lastName} tag/>;

    resultRenderer.propTypes = {
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      address: PropTypes.string,
      image: PropTypes.string,
      description: PropTypes.string,
      interests: PropTypes.string,
      preferredDestinations: PropTypes.string,
      standing: PropTypes.string,
    };
    const { isLoading, value, results } = this.state;
    return (
        <Container>
          <Header as="h2" textAlign="center" inverted>List Housemates</Header>
          <Dropdown placeholder='Filter Search'
                    selection
                    options={searchOptions}
                    onChange={this.handleDropdownChange}/>
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
  const subscription = Meteor.subscribe('Mates');
  const subscription2 = Meteor.subscribe('Notes');
  return {
    profiles: Mates.find({}).fetch(),
    notes: Notes.find({}).fetch(),
    ready: (subscription.ready() && subscription2.ready()),
  };
})(ListHousemates);
