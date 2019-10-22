<template>
    <v-app id="inspire">
        <v-card>

            <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on">Edit Eit</v-btn>

            </template>
            <v-card>
                <v-card-title>
                    <span class="headline">Edit Item </span>

                </v-card-title>

                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="6" sm="6" md="6">
                                <v-text-field v-model="editItem.first_name"
                                              label="First Name"></v-text-field>
                                <small class="err" v-if="errors.first_name">{{errors.first_name}}</small>
                            </v-col>
                            <v-col cols="6" sm="6" md="6">
                                <v-text-field v-model="editItem.last_name"
                                              label="Last Name"></v-text-field>
                                <small class="err" v-if="errors.last_name">{{errors.last_name}}</small>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="editItem.country"
                                              label="Country"></v-text-field>
                                <small class="err" v-if="errors.country">{{errors.country}}</small>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="editItem.email"
                                              label="Email"></v-text-field>
                                <small class="err" v-if="errors.email">{{errors.email}}</small>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">

                                <v-text-field v-model="editItem.contact"
                                              label="Contact"></v-text-field>
                                <small class="err" v-if="errors.age">{{errors.age}}</small>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="editItem.age" label="Age"></v-text-field>
                                <small class="err" v-if="errors.age">{{errors.age}}</small>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                                <v-select :items="genders" v-model="editItem.gender"
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
    import {Eits} from "../../import/api/eits.js"

    export default {
        props: {
            source: String,
        },
        data: () => ({
            genders: ['Male', 'Female'],
            errors: {}
        }),
        computed: {
            editItem(){
                return Eits.findOne(this.$route.params.eitId)
            },
            editedId(){
                return this.$route.params.eitId
            }
        },
        meteor: {
// Subscriptions and Collections queries here

        },
        mounted() {

        },
        methods: {

            save() {
                this.errors = {}
                if (this.editItem.first_name !== "" && this.editItem.last_name !== "" && this.editItem.country !== "" && this.editItem.email !== "" && this.editItem.contact !== "" && this.editItem.age !== "" && this.editItem.gender !== "") {
                    //Eits.update(this.editedId, this.editItem)
                    Meteor.call('eits.update',this.editedId,this.editItem)
                    this.$router.push('/show')
                } else {
                    if (this.editItem.first_name === "") {
                        this.errors["first_name"] = "First Name is Required"
                    }
                    if (this.editItem.last_name === "") {
                        this.errors["last_name"] = "Last Name is Required"
                    }
                    if (this.editItem.country === "") {
                        this.errors["country"] = "Country is Required"
                    }
                    if (this.editItem.age === "") {
                        this.errors["age"] = "Country is Required"
                    }
                    if (this.editItem.contact === "") {
                        this.errors["contact"] = "Contact is Required"
                    }
                    if (this.editItem.gender === "") {
                        this.errors["gender"] = "Gender is Required"
                    }
                    if (this.editItem.email === "") {
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
