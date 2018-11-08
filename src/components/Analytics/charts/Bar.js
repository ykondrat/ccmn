import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: ['post'],
  mounted () {
      console.log(this.post);
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'GitHub Commits',
          backgroundColor: '#f87979',
          data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
        }
      ]
  },
  {
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
                                        color: 'rgba(0,255,255,0.2)'
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
                                        color: 'rgba(0,255,255,0.2)'
                                    }
                                }]
                            }
                        }
)
  }
}
