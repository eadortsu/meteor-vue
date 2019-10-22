import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Eits = new Mongo.Collection('eits');
if (Meteor.isServer){
    Meteor.publish('eits',function () {
        return Eits.find({})
    })
}

Meteor.methods({
    'eits.insert'(eit) {
        //check(text, String);

        // Make sure the user is logged in before inserting a task
       /* if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }*/

        Eits.insert(eit);
    },
    'eits.remove'(eitId) {
        check(eitId, String);
        /*const eit = Eits.findOne(eitId);
        if (eit.private && eit.owner !== this.userId) {
            // If the eit is private, make sure only the owner can delete it
            throw new Meteor.Error('not-authorized');
        }*/
        Eits.remove(eitId);
    },
    'eits.update'(eitId, editedEit) {
        check(eitId, String);
       /* const eit = Eits.findOne(eitId);*/
       /* if (eit.private && eit.owner !== this.userId) {
            // If the eit is private, make sure only the owner can check it off
            throw new Meteor.Error('not-authorized');
        }*/
        Eits.update(eitId, editedEit)
    },

});
