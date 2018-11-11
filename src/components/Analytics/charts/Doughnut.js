// Core
import { Doughnut } from 'vue-chartjs';

export default {
    extends: Doughnut,
    props: {
        data: {
            type: Array
        },
        labelForDoughnut: {
            type: Array
        }
    },
    watch: {
        data: function () {
            this.render();
        }
    },
    methods: {
        render: function () {
            this.renderChart(
                {
                    labels: this.labelForDoughnut,
                    datasets: [
                        {
                            data: this.data,
                            backgroundColor: [
                                'rgba(255,0,255,0.3)',
                                'rgba(0,255,255,0.3)',
                                'rgba(255,255,0,0.3)'
                            ],
                            hoverBackgroundColor: [
                                'rgba(255,0,255,0.6)',
                                'rgba(0,255,255,0.6)',
                                'rgba(255,255,0,0.6)'
                            ]
                        }
                    ]
                },
                {
                    maintainAspectRatio: false,
                    height: 100,
                    legend: {
                        labels: {
                            fontColor: 'black',
                            fontSize: 18
                        }
                    },
                }
            );
        }
    },
    mounted () {
        this.render();
    }

}
