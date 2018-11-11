<template>
    <b-row>
        <b-col md = '8'>
            <h5 class = 'graph-headings'>Dwell Time</h5>
            <Bar
                v-if = 'isDone'
                :datasets = 'datasets'
                :labels = 'labels'
            />
        </b-col>
        <b-col md = '4'>
            <h5 class = 'graph-headings'>Dwell Time Distribution</h5>
            <Doughnut
                v-if = 'isDone'
                :data = 'data'
                :labelForDoughnut = 'labelForDoughnut'
            />
        </b-col>
    </b-row>
</template>

<script>
    // Charts
    import Bar from '../../charts/Bar';
    import Doughnut from '../../charts/Doughnut';

    export default {
        name: 'DwellTime',
        props: {
            labels: {
                type: Array
            },
            datasets: {
                type: Array
            },
            data: {
                type: Array
            }
        },
        data () {
            return ({
                isDone: false,
                labelForDoughnut: [ '5 - 30 min.', '30 - 60 min.', '1 - 5 h.', '5 - 8 h.', '8+ h.' ]
            });
        },
        watch: {
            datasets: function (dataset) {
                this.datasets = dataset;
                this.isDone = true;
            },
            data: function (data) {
                this.data = data;
            }
        },
        components: {
            Bar,
            Doughnut,
        }
    }

</script>

<style>

</style>
