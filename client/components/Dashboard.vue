<template>
    <v-app id="inspire">

    </v-app>
</template>

<script>
    import {Meteor} from 'meteor/meteor'
    import {Eits} from "../../import/api/eits.js"

    export default {
        props: {
            source: String,
        },
        data: () => ({

        }),
        computed: {

        },
        watch: {

        },
        meteor: {
// Subscriptions and Collections queries here
            $subscribe: {
                'eits': [],
            },
            eits() {
                return Eits.find({}, {
                    sort: {date: -1}
                })
            },
        },
        mounted() {
        },
        methods: {

        },
    }
</script>
<style>
    .err{
        color: red;
    }
</style>
