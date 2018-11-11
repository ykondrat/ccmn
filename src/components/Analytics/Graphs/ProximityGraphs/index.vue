<template>
    <b-row>
        <b-col md = '8'>
            <h5 class = 'graph-headings'>Proximity</h5>
            <Bar
                v-if = 'isDone'
                :datasets = 'datasets'
                :labels = 'labels'
            />
        </b-col>
        <b-col md = '4'>
            <h5 class = 'graph-headings'>Proximity Distribution</h5>
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
        name: 'Proximity',
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
                labelForDoughnut: [ 'Connected', 'Passerby', 'Visitors']
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
