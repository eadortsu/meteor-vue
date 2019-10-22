<template>
    <v-app id="inspire">
            <v-card>
                <!-- <v-card-title>
                     EIT 2020
                     <v-spacer></v-spacer>
                     <v-text-field
                             v-model="search"
                             append-icon="mdi-magnify"
                             label="Search"
                             single-line
                             hide-details
                     ></v-text-field>
                 </v-card-title>-->

                <v-data-table
                        v-model="selected"
                        :headers="headers"
                        :items="eits"
                        :search="search"
                        item-key="_id"

                        show-select

                >
                    <template v-slot:top>
                        <v-toolbar flat color="white">
                            <v-toolbar-title>EIT's ({{count}})</v-toolbar-title>
                            <v-divider
                                    class="mx-4"
                                    inset
                                    vertical
                            ></v-divider>
                            <v-btn color="red" v-if="selected.length" @click="bulkDeleteItem" dark class="mb-2">Delete
                                Selected ({{selected.length}})
                            </v-btn>
                            <v-spacer></v-spacer>

                        </v-toolbar>
                    </template>
                    <template v-slot:item.name="{ item }">
                        {{item.first_name +' '+item.last_name}}
                    </template>
                    <template v-slot:item.action="{ item }">
                        <v-icon
                                small
                                class="mr-2"
                                @click="$router.push({ name: 'edit', params: { eitId: item._id }})"
                        >
                            mdi-pencil
                        </v-icon>
                        <v-icon
                                small
                                @click="deleteItem(item)"
                        >
                            mdi-delete
                        </v-icon>
                    </template>

                    <template v-slot:no-data>
                        <v-btn color="primary" @click="initialize">Refresh</v-btn>
                    </template>
                </v-data-table>

            </v-card>
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
            drawer: false,
            search: '',
            selected: [],
            headers: [
                {
                    text: 'Full Name',
                    align: 'left',
                    sortable: true,
                    value: 'name',
                },
                {text: 'Country', value: 'country'},
                {text: 'Email', value: 'email'},
                {text: 'Contact', value: 'contact'},
                {text: 'Age', value: 'age'},
                {text: 'Gender', value: 'gender'},
                {text: 'Actions', value: 'action', sortable: false},
            ],
        }),
        computed: {

            count() {
                return this.eits.length
            },
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
            initialize() {
                this.eits = Eits.find({}).fetch()
            },
            deleteItem(item) {
                const index = this.eits.indexOf(item)
                confirm('Are you sure you want to delete this item?') && this.eits.splice(index, 1) && Meteor.call('eits.remove',item._id)
            },
            bulkDeleteItem() {
                confirm('Are you sure you want to delete all ' + this.selected.length + ' selected items?') && this.selected.map(item => Meteor.call('eits.remove',item._id))
                this.selected = []
            },

        },
    }
</script>
<style>
    .err{
        color: red;
    }
</style>
