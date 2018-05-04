import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Mates = new Mongo.Collection('Mates');

/** Create a schema to constrain the structure of documents associated with this collection. */
const HousemateSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  address: String,
  standing: String,
  contactInfo: String,
  preferredDestinations: String,
  image: String,
  interests: String,
  description: String,
  owner: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Mates.attachSchema(HousemateSchema);

/** Make the collection and schema available to other code. */
export { Mates, HousemateSchema };
