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
                                @click="$router.push(child.path)"
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
                            @click="$router.push(item.path)"
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
                    v-if="$route.path === '/show'"
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

            <router-view></router-view>
        </v-content>
        <v-btn v-if="$route.path === '/new'"
                bottom
                color="pink"
                dark
                fab
                fixed
                right
                @click="$router.push('/show')"
        >
            <v-icon>mdi-format-float-left</v-icon>
        </v-btn>

        <v-btn v-if="$route.path === '/show'"
               bottom
               color="pink"
               dark
               fab
               fixed
               right
               @click="$router.push('/new')"
        >
            <v-icon>mdi-plus</v-icon>
        </v-btn>



    </v-app>
</template>

<script>
    import {Meteor} from 'meteor/meteor'
    import {Eits} from "../import/api/eits.js"

    export default {
        props: {
            source: String,
        },
        data: () => ({
            genders: ['Male', 'Female'],
            dialog: false,
            drawer: true,
            menus: [
                {icon: 'mdi-view-dashboard', text: 'Dashboard', path:'/dashboard' },
                {
                    icon: 'mdi-chevron-up',
                    'icon-alt': 'mdi-chevron-down',
                    text: "EIT's",
                    model: false,
                    children: [
                        {icon: "mdi-account-multiple", text: 'Show All' , path:'/show'},
                        {icon: "mdi-account-multiple-plus", text: 'Add New', path: '/new'},
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
