<template>
    <v-container
            class="fill-height"
            fluid
    >
        <v-row
                align="center"
                justify="center"
        >
            <v-col
                    cols="12"
                    sm="8"
                    md="4"
            >
                <v-card class="elevation-12">
                    <v-toolbar
                            color="primary"
                            dark
                            flat
                    >

                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                        <blaze-template template="atForm" ></blaze-template>
                    </v-card-text>

                </v-card>
            </v-col>
        </v-row>
    </v-container>

</template>

<script>
    import {Meteor} from 'meteor/meteor'

    export default {
        data: () => ({

        }),
        components: {

        },
        beforeMount(){
            if(Meteor.user() !== null){
                this.$router.push('/show')
            }
        },


    }
</script>
