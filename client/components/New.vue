<template>
    <v-app id="inspire">
        <v-card>

            <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on">New Eit</v-btn>

            </template>
            <v-card>
                <v-card-title>
                    <span class="headline">New Item</span>

                </v-card-title>

                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="6" sm="6" md="6">
                                <v-text-field v-model="insetItem.first_name"
                                              label="First Name"></v-text-field>
                                <small class="err" v-if="errors.first_name">{{errors.first_name}}</small>
                            </v-col>
                            <v-col cols="6" sm="6" md="6">
                                <v-text-field v-model="insetItem.last_name"
                                              label="Last Name"></v-text-field>
                                <small class="err" v-if="errors.last_name">{{errors.last_name}}</small>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="insetItem.country"
                                              label="Country"></v-text-field>
                                <small class="err" v-if="errors.country">{{errors.country}}</small>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="insetItem.email"
                                              label="Email"></v-text-field>
                                <small class="err" v-if="errors.email">{{errors.email}}</small>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">

                                <v-text-field v-model="insetItem.contact"
                                              label="Contact"></v-text-field>
                                <small class="err" v-if="errors.age">{{errors.age}}</small>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="insetItem.age" label="Age"></v-text-field>
                                <small class="err" v-if="errors.age">{{errors.age}}</small>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                                <v-select :items="genders" v-model="insetItem.gender"
                                          label="Gender"></v-select>
                                <small class="err" v-if="errors.gender">{{errors.gender}}</small>

                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn color="blue darken-1"  @click="save">Save</v-btn>
                </v-card-actions>
            </v-card>


        </v-card>
    </v-app>
</template>

<script>
    import {Meteor} from 'meteor/meteor'
    import  "../../import/api/eits.js"

    export default {
        props: {
            source: String,
        },
        data: () => ({
            genders: ['Male', 'Female'],
            insetItem: {
                first_name: '',
                last_name: '',
                country: '',
                email: '',
                contact: '',
                age: '',
                gender: '',
            },
            errors: {}
        }),
        computed: {},
        meteor: {
// Subscriptions and Collections queries here

        },
        mounted() {
        },
        methods: {

            save() {
                this.errors = {}
                if (this.insetItem.first_name !== "" && this.insetItem.last_name !== "" && this.insetItem.country !== "" && this.insetItem.email !== "" && this.insetItem.contact !== "" && this.insetItem.age !== "" && this.insetItem.gender !== "") {
                       // Eits.insert(this.insetItem)
                    Meteor.call('eits.insert',this.insetItem)
                    this.$router.push('/show')
                } else {
                    if (this.insetItem.first_name === "") {
                        this.errors["first_name"] = "First Name is Required"
                    }
                    if (this.insetItem.last_name === "") {
                        this.errors["last_name"] = "Last Name is Required"
                    }
                    if (this.insetItem.country === "") {
                        this.errors["country"] = "Country is Required"
                    }
                    if (this.insetItem.age === "") {
                        this.errors["age"] = "Country is Required"
                    }
                    if (this.insetItem.contact === "") {
                        this.errors["contact"] = "Contact is Required"
                    }
                    if (this.insetItem.gender === "") {
                        this.errors["gender"] = "Gender is Required"
                    }
                    if (this.insetItem.email === "") {
                        this.errors["email"] = "Email is Required"
                    }
                }
            },
        },
    }
</script>
<style>
    .err {
        color: red;
    }
</style>
