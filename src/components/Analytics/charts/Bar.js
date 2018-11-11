// Core
import { Bar } from 'vue-chartjs';

export default {
    extends: Bar,
    props: {
        labels: {
            type: Array
        },
        datasets: {
            type: Array
        }
    },
    watch: {
        datasets: function () {
            this.render();
        }
    },
    methods: {
        render: function () {
            this.renderChart(
                {
                    labels: this.labels,
                    datasets: this.datasets
                },
                {
                    maintainAspectRatio: false,
                    height: 200,
                    legend: {
                        labels: {
                            fontColor: 'black',
                            fontSize: 18
                        }
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                fontColor: 'black',
                            },
                            gridLines: {
                                display: true,
                                color: 'black'
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                fontColor: 'black',
                                fontSize: 14,
                                stepSize: 1,
                                beginAtZero: true
                            },
                            gridLines: {
                                display: true,
                                color: 'black'
                            }
                        }]
                    }
                }
            );
        }
    },
    mounted () {
        this.render();
    }
}
