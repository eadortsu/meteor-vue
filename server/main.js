import { Meteor } from 'meteor/meteor';
import '../import/api/eits.js'


ServiceConfiguration.configurations.upsert(
    { service: 'github' },
    {
        $set: {
            loginStyle: "popup",
            clientId: "aba4c8d143f15b43c958", // See table below for correct property name!
            secret: "ce006b758f36d63624d2ee0c82f98d2800f21000"
        }
    }
);
ServiceConfiguration.configurations.upsert(
    { service: 'google' },
    {
        $set: {
            loginStyle: "popup",
            clientId: "834158104329-6o6nis9re0hc92ai7pvm1uldge7gv3rp.apps.googleusercontent.com", // See table below for correct property name!
            secret: "KzjHWyPz4SKsukQ7LMyqI69X"
        }
    }
);
ServiceConfiguration.configurations.upsert(
    { service: 'facebook' },
    {
        $set: {
            loginStyle: "popup",
            appId: "426943044628806", // See table below for correct property name!
            secret: "440d5e0a6eb14de1ef4227ccac54c12d"
        }
    }
);
ServiceConfiguration.configurations.upsert(
    { service: 'twitter' },
    {
        $set: {
            loginStyle: "popup",
            clientId: "aba4c8d143f15b43c958", // See table below for correct property name!
            secret: "ce006b758f36d63624d2ee0c82f98d2800f21000"
        }
    }
);
Meteor.startup(() => {
  // code to run on server at startup

});
