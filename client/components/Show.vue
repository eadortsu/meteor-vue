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
            genders: ['Male', 'Female'],
            dialog: false,
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
            editedIndex: -1,
            editedId: null,
            editedItem: {
                first_name: '',
                last_name: '',
                country: '',
                email: '',
                contact: '',
                age: '',
                gender: '',
            },
            defaultItem: {
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
        computed: {

            count() {
                return this.eits.length
            },
        },
        watch: {
            dialog(val) {
                val || this.close()
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
            editItem(item) {
                this.editedIndex = this.eits.indexOf(item)
                this.editedId = item._id
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },
            deleteItem(item) {
                const index = this.eits.indexOf(item)
                confirm('Are you sure you want to delete this item?') && this.eits.splice(index, 1) && Eits.remove(item._id)
            },
            bulkDeleteItem() {
                confirm('Are you sure you want to delete all ' + this.selected.length + ' selected items?') && this.selected.map(item => Eits.remove(item._id))
                this.selected = []
            },
            close() {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                    this.editedId = null
                }, 300)
            },
            save() {
                this.errors = {}
                if (this.editedItem.first_name !== "" && this.editedItem.last_name !== "" && this.editedItem.country !== "" && this.editedItem.email !== "" && this.editedItem.contact !== "" && this.editedItem.age !== "" && this.editedItem.gender !== "") {
                    if (this.editedIndex > -1 && this.editedId !== null) {
                        Object.assign(this.eits[this.editedIndex], this.editedItem)
                        Eits.update(this.editedId, this.editedItem)
                    } else {
                        this.eits.push(this.editedItem)
                        Eits.insert(this.editedItem)
                    }
                    this.close()
                }else {
                    if(this.editedItem.first_name === ""){ this.errors["first_name"] = "First Name is Required"}
                    if(this.editedItem.last_name === ""){ this.errors["last_name"] = "Last Name is Required"}
                    if(this.editedItem.country === ""){ this.errors["country"] = "Country is Required"}
                    if(this.editedItem.age === ""){ this.errors["age"] = "Country is Required"}
                    if(this.editedItem.contact === ""){ this.errors["contact"] = "Contact is Required"}
                    if(this.editedItem.gender === ""){ this.errors["gender"] = "Gender is Required"}
                    if(this.editedItem.email === ""){ this.errors["email"] = "Email is Required"}
                }
            },
        },
    }
</script>
<style>
    .err{
        color: red;
    }
</style>
