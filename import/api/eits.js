import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Eits = new Mongo.Collection('eits');
if (Meteor.isServer){
    Meteor.publish('eits',function () {
        return Eits.find({})
    })
}