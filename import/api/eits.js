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
    'eits.insert'(text) {
        //check(text, String);

        // Make sure the user is logged in before inserting a task
        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Eits.insert({
            text,
            createdAt: new Date(),
            owner: this.userId,
            username: Meteor.users.findOne(this.userId).username,
        });
    },
    'eits.remove'(eitId) {
        check(eitId, String);
        const eit = Eits.findOne(eitId);
        if (eit.private && eit.owner !== this.userId) {
            // If the eit is private, make sure only the owner can delete it
            throw new Meteor.Error('not-authorized');
        }
        Eits.remove(eitId);
    },
    'eits.update'(eitId, setChecked) {
        check(eitId, String);
        check(setChecked, Boolean);
        const eit = Eits.findOne(eitId);
        if (eit.private && eit.owner !== this.userId) {
            // If the eit is private, make sure only the owner can check it off
            throw new Meteor.Error('not-authorized');
        }
        Eits.update(eitId, { $set: { checked: setChecked },
            'eits.setPrivate'(eitId, setToPrivate) {
                check(eitId, String);
                check(setToPrivate, Boolean);

                const eit = Eits.findOne(eitId);

                // Make sure only the eit owner can make a eit private
                if (eit.owner !== this.userId) {
                    throw new Meteor.Error('not-authorized');
                }

                Eits.update(eitId, { $set: { private: setToPrivate } });
            },
        });
    },

});
