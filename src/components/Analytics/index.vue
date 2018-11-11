<template>
    <div class = 'main'>
        <b-container fluid>
            <b-row>
                <b-col md = '1' >
                    <div v-if = 'isFetching' class = 'spinner'/>
                </b-col>
                <b-col md = '3' offset-md = '4'>
                    <div class = 'date-wrapper'>
                        <date-picker v-model = 'range' range lang = 'en' />
                    </div>
                </b-col>
                <b-col md = '3' offset-md = '1'>
                    <b-dropdown text = 'Date' class = 'm-md-2 dropdown-date'>
                        <b-dropdown-item v-on:click = 'changeDate(`today`)'>Today</b-dropdown-item>
                        <b-dropdown-item v-on:click = 'changeDate(`yesterday`)'>Yesterday</b-dropdown-item>
                        <b-dropdown-item v-on:click = 'changeDate(`lastweek`)'>Last week</b-dropdown-item>
                        <b-dropdown-item v-on:click = 'changeDate(`lastmonth`)'>Last month</b-dropdown-item>
                        <b-dropdown-divider />
                        <b-dropdown-item disabled>Or select date range</b-dropdown-item>
                    </b-dropdown>
                </b-col>
            </b-row>
            <h1>Analytics</h1>
            <Header
                v-if = 'viewHeader'
                :time = 'time'
                :range = 'range'
                :toggleFetch = 'toggleFetch'
                :setNotification = 'setNotification'
            />
            <Graphs
                v-else
                :time = 'time'
                :range = 'range'
                :toggleFetch = 'toggleFetch'
                :setNotification = 'setNotification'
            />
            <b-button
                size = 'lg'
                variant = 'outline-secondary'
                class = 'graph-btn'
                v-on:click = 'setView()'
            >
                {{ viewHeader ? 'Go to graphs' : 'Go to analytics' }}
            </b-button>
        </b-container>
    </div>
</template>

<script>
    // Components
    import DatePicker from 'vue2-datepicker';
    import Header from './Header';
    import Graphs from './Graphs';

    export default {
        name: 'Analytics',
        data () {
            return ({
                viewHeader: true,
                time: 'today',
                range: [ null, null ],
                isFetching: true
            });
        },
        methods: {
            changeDate: function (date) {
                this.time = date;
                this.range = [ null, null ];
            },
            toggleFetch: function (bool) {
                this.isFetching = bool;
            },
            setNotification: function () {
                this.$notify({
                    group: 'error',
                    title: 'Error message',
                    text: 'Something goes wrong with CISCO-API. Try later.'
                });
            },
            setView: function () {
                const { viewHeader } = this;

                this.viewHeader = !viewHeader;
            }
        },
        components: {
            Header,
            DatePicker,
            Graphs
        }
    }

</script>

<style>
    .dropdown-date, .dropdown-date.btn-group > .btn:first-child, .dropdown-date .dropdown-menu {
        width: 100%;
    }
    .date-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
    }
    .graph-btn {
        margin-top: 20px;
        font-weight: bold;
    }
    @keyframes spinner {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
    .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #343a40;
        border-top: 5px solid #aeb8c1;
        border-radius: 100%;
        margin: 10px auto;
        animation: spinner 1s infinite linear;
        z-index: 1;
    }
</style>
