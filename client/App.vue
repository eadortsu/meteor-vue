<template>
    <v-app id="inspire">
        <v-navigation-drawer
                v-model="drawer"
                :clipped="$vuetify.breakpoint.lgAndUp"
                app
        >
            <v-list dense>
                <template v-for="item in menus">
                    <v-row
                            v-if="item.heading"
                            :key="item.heading"
                            align="center"
                    >
                        <v-col cols="6">
                            <v-subheader v-if="item.heading">
                                {{ item.heading }}
                            </v-subheader>
                        </v-col>
                        <v-col
                                cols="6"
                                class="text-center"
                        >
                            <a
                                    href="#!"
                                    class="body-2 black--text"
                            >EDIT</a>
                        </v-col>
                    </v-row>
                    <v-list-group
                            v-else-if="item.children"
                            :key="item.text"
                            v-model="item.model"
                            :prepend-icon="item.model ? item.icon : item['icon-alt']"
                            append-icon=""
                    >
                        <template v-slot:activator>
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        {{ item.text }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                        <v-list-item
                                v-for="(child, i) in item.children"
                                :key="i"
                                @click=""
                        >
                            <v-list-item-action v-if="child.icon">
                                <v-icon>{{ child.icon }}</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{ child.text }}
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-group>
                    <v-list-item
                            v-else
                            :key="item.text"
                            @click=""
                    >
                        <v-list-item-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>
                                {{ item.text }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar
                :clipped-left="$vuetify.breakpoint.lgAndUp"
                app
                color="blue darken-3"
                dark
        >
            <v-toolbar-title
                    style="width: 300px"
                    class="ml-0 pl-4"
            >
                <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                <span class="hidden-sm-and-down">Mest APP</span>
            </v-toolbar-title>
            <v-text-field
                    flat
                    solo-inverted
                    hide-details
                    prepend-inner-icon="mdi-magnify"
                    label="Search"
                    v-model="search"
                    class="hidden-sm-and-down"
            ></v-text-field>
            <v-spacer></v-spacer>

            <v-btn
                    icon
                    large
            >
                <v-avatar
                        size="52px"
                        item
                >
                    <v-img
                            src="/logo.png"
                            alt="Vuetify"
                    >
                    </v-img>
                </v-avatar>
            </v-btn>
        </v-app-bar>
        <v-content>
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
                        item-key="_id._str"

                        show-select

                >
                    <template v-slot:top>
                        <v-toolbar flat color="white">
                            <v-toolbar-title >EIT's ({{count}})</v-toolbar-title>
                            <v-divider
                                    class="mx-4"
                                    inset
                                    vertical
                            ></v-divider>
                            <v-btn color="red" v-if="selected.length"  @click="bulkDeleteItem" dark class="mb-2" >Delete Selected ({{selected.length}})</v-btn>
                            <v-spacer></v-spacer>
                            <v-dialog v-model="dialog" max-width="500px">
                                <template v-slot:activator="{ on }">
                                    <v-btn color="primary" dark class="mb-2" v-on="on">New Eit</v-btn>

                                </template>
                                <v-card>
                                    <v-card-title>
                                        <span class="headline">{{ formTitle }}</span>
                                    </v-card-title>

                                    <v-card-text>
                                        <v-container>
                                            <v-row>
                                                <v-col cols="6" sm="6" md="6">
                                                    <v-text-field v-model="editedItem.first_name"
                                                                  label="First Name"></v-text-field>
                                                </v-col>
                                                <v-col cols="6" sm="6" md="6">
                                                    <v-text-field v-model="editedItem.last_name"
                                                                  label="Last Name"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="12" md="12">
                                                    <v-text-field v-model="editedItem.country"
                                                                  label="Country"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="12" md="12">
                                                    <v-text-field v-model="editedItem.email"
                                                                  label="Email"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="12" md="12">

                                                    <v-text-field v-model="editedItem.contact"
                                                                  label="Contact"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="12" md="12">
                                                    <v-text-field v-model="editedItem.age" label="Age"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" sm="12" md="12">
                                                    <v-select :items="genders" v-model="editedItem.gender"
                                                              label="Gender"></v-select>

                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card-text>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                        <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-toolbar>
                    </template>
                    <template v-slot:item.name="{ item }">
                        {{item.first_name +' '+item.last_name}}
                    </template>
                    <template v-slot:item.action="{ item }">
                        <v-icon
                                small
                                class="mr-2"
                                @click="editItem(item)"
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

        </v-content>
        <v-btn
                bottom
                color="pink"
                dark
                fab
                fixed
                right
                @click="dialog = !dialog"
        >
            <v-icon>mdi-plus</v-icon>
        </v-btn>

    </v-app>
</template>

<script>
    import { Meteor } from 'meteor/meteor'
    import {Eits} from "../import/api/eits.js"

    export default {

        props: {
            source: String,
        },
        data: () => ({
            genders: ['Male', 'Female'],
            dialog: false,
            drawer: false,
            menus: [
                {icon: 'mdi-view-dashboard', text: 'Dashboard'},
                {
                    icon: 'mdi-chevron-up',
                    'icon-alt': 'mdi-chevron-down',
                    text: "EIT's",
                    model: false,
                    children: [
                        {icon: "mdi-account-multiple", text: 'Show All'},
                        {icon: "mdi-account-multiple-plus", text: 'Add New'},


                    ],
                },


            ],
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
        }),

        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
            },
            count () {
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
            eits () {
                return Eits.find({}, {
                    sort: {date: -1}
                })
            },
        },
        mounted(){

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
                confirm('Are you sure you want to delete all '+this.selected.length+' selected items?') && this.selected.map(item => Eits.remove(item._id))
            },
            close() {
                this.dialog = false
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                    this.editedId = null
                }, 300)
            },

            save(item) {
                if (this.editedIndex > -1 && this.editedId !== null) {
                    Object.assign(this.eits[this.editedIndex], this.editedItem)
                    Eits.update(this.editedId, this.editedItem)
                } else {
                    this.eits.push(this.editedItem)
                    Eits.insert(this.editedItem)
                }
                this.close()
            },


        },
    }
</script>