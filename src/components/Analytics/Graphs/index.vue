<template>
    <div>
        <Proximity
            :labels = 'proximity.labels'
            :datasets = 'proximity.datasets'
            :data = 'proximity.data'
        />
        <DwellTime
            :labels = 'dwellTime.labels'
            :datasets = 'dwellTime.datasets'
            :data = 'dwellTime.data'
        />
    </div>
</template>

<script>
    // API
    import { api } from '../../../API';

    // Instruments
    import moment from 'moment';

    // Components
    import Proximity from './ProximityGraphs';
    import DwellTime from './DwellTimeGraphs';

    export default {
        name: 'Graphs',
        props: [ 'time', 'range', 'toggleFetch', 'setNotification' ],
        data () {
            return ({
                proximity: {
                    datasets: [],
                    labels: [],
                    data: []
                },
                dwellTime: {
                    datasets: [],
                    labels: [],
                    data: []
                }
            });
        },
        async mounted () {
            try {
                this.toggleFetch(true);

                await this.getProximity();
                await this.getDwellTime();
            } catch (e) {
                this.setNotification();
            } finally {
                this.toggleFetch(false);
            }
        },
        watch: {
            time: async function () {
                try {
                    this.toggleFetch(true);

                    await this.getProximity();
                    await this.getDwellTime();
                } catch (e) {
                    this.setNotification();
                } finally {
                    this.toggleFetch(false);
                }
            },
            range: async function () {
                try {
                    this.toggleFetch(true);

                    await this.getProximity();
                    await this.getDwellTime();
                } catch (e) {
                    this.setNotification();
                } finally {
                    this.toggleFetch(false);
                }
            },
        },
        methods: {
            getProximity: async function () {
                const time = this.getTime(this.time);
                let urls = [
                    `/presence/v1/connected/${time}?siteId=${api.siteId}`,
                    `/presence/v1/passerby/${time}?siteId=${api.siteId}`,
                    `/presence/v1/visitor/${time}?siteId=${api.siteId}`,
                    `/presence/v1/kpisummary/${this.time}?siteId=${api.siteId}`
                ];

                if (this.range[0] !== null && this.range[1] !== null) {
                    const startDate = moment(this.range[0]).format('YYYY-MM-DD');
                    const endDate = moment(this.range[1]).format('YYYY-MM-DD');

                    urls = [
                        `/presence/v1/connected/daily?siteId=${api.siteId}&startDate=${startDate}&endDate=${endDate}`,
                        `/presence/v1/passerby/daily?siteId=${api.siteId}&startDate=${startDate}&endDate=${endDate}`,
                        `/presence/v1/visitor/daily?siteId=${api.siteId}&startDate=${startDate}&endDate=${endDate}`,
                        `/presence/v1/kpisummary?siteId=${api.siteId}&startDate=${startDate}&endDate=${startDate}`
                    ];
                }

                const promises = urls.map(url => api.presence.get(url));
                const data = await Promise.all(promises);
                const dataset = [
                    {
                        label: 'Connected',
                        backgroundColor: 'rgba(255,0,255,0.3)',
                        borderColor: 'rgba(255,0,255,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(255,0,255,0.6)',
                        hoverBorderColor: 'rgba(255,0,255,1)',
                        data: Object.values(data[0])
                    },
                    {
                        label: 'Passerby',
                        backgroundColor: 'rgba(0,255,255,0.3)',
                        borderColor: 'rgba(0,255,255,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(0,255,255,0.6)',
                        hoverBorderColor: 'rgba(0,255,255,1)',
                        data: Object.values(data[1])
                    },
                    {
                        label: 'Visitors',
                        backgroundColor: 'rgba(255,255,0,0.3)',
                        borderColor: 'rgba(255,255,0,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(255,255,0,0.6)',
                        hoverBorderColor: 'rgba(255,255,0,1)',
                        data: Object.values(data[2])
                    }
                ];
                this.$set(this.proximity, 'labels', Object.keys(data[1]))
                this.$set(this.proximity, 'datasets', dataset);
                this.$set(this.proximity, 'data', [
                    data[3].totalConnectedCount,
                    data[3].totalPasserbyCount,
                    data[3].totalVisitorCount
                ]);
            },
            getDwellTime: async function () {
                const time = this.getTime(this.time);
                let urls = [
                    `/presence/v1/dwell/${time}?siteId=${api.siteId}`,
                    `/presence/v1/dwell/count/${this.time}?siteId=${api.siteId}`
                ];

                if (this.range[0] !== null && this.range[1] !== null) {
                    const startDate = moment(this.range[0]).format('YYYY-MM-DD');
                    const endDate = moment(this.range[1]).format('YYYY-MM-DD');

                    urls = [
                        `/presence/v1/dwell/daily?siteId=${api.siteId}&startDate=${startDate}&endDate=${endDate}`,
                        `/presence/v1/dwell/count?siteId=${api.siteId}&startDate=${startDate}&endDate=${endDate}`
                    ];
                }

                const promises = urls.map(url => api.presence.get(url));
                const data = await Promise.all(promises);
                let FIVE_TO_THIRTY_MINUTES = [];
                let THIRTY_TO_SIXTY_MINUTES = [];
                let ONE_TO_FIVE_HOURS = [];
                let FIVE_TO_EIGHT_HOURS = [];
                let EIGHT_PLUS_HOURS = [];

                for (let variable in data[0]) {
                    FIVE_TO_THIRTY_MINUTES.push(data[0][variable].FIVE_TO_THIRTY_MINUTES);
                    THIRTY_TO_SIXTY_MINUTES.push(data[0][variable].THIRTY_TO_SIXTY_MINUTES);
                    ONE_TO_FIVE_HOURS.push(data[0][variable].ONE_TO_FIVE_HOURS);
                    FIVE_TO_EIGHT_HOURS.push(data[0][variable].FIVE_TO_EIGHT_HOURS);
                    EIGHT_PLUS_HOURS.push(data[0][variable].EIGHT_PLUS_HOURS);
                }

                const dataset = [
                    {
                        label: '5 - 30 min.',
                        backgroundColor: 'rgba(0,255,255,0.3)',
                        borderColor: 'rgba(0,255,255,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(0,255,255,0.6)',
                        hoverBorderColor: 'rgba(0,255,255,1)',
                        data: FIVE_TO_THIRTY_MINUTES
                    },
                    {
                        label: '30 - 60 min.',
                        backgroundColor: 'rgba(255,0,255,0.3)',
                        borderColor: 'rgba(255,0,255,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(255,0,255,0.6)',
                        hoverBorderColor: 'rgba(255,0,255,1)',
                        data: THIRTY_TO_SIXTY_MINUTES
                    },
                    {
                        label: '1 - 5 h.',
                        backgroundColor: 'rgba(255,255,0,0.3)',
                        borderColor: 'rgba(255,255,0,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(255,255,0,0.6)',
                        hoverBorderColor: 'rgba(255,255,0,1)',
                        data: ONE_TO_FIVE_HOURS
                    },
                    {
                        label: '5 - 8 h.',
                        backgroundColor: 'rgba(0,0,255,0.3)',
                        borderColor: 'rgba(0,0,255,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(0,0,255,0.6)',
                        hoverBorderColor: 'rgba(0,0,255,1)',
                        data: FIVE_TO_EIGHT_HOURS
                    },
                    {
                        label: '8+ h.',
                        backgroundColor: 'rgba(0,255,0,0.3)',
                        borderColor: 'rgba(0,255,0,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(0,255,0,0.6)',
                        hoverBorderColor: 'rgba(0,255,0,1)',
                        data: EIGHT_PLUS_HOURS
                    }
                ];

                this.$set(this.dwellTime, 'labels', Object.keys(data[0]));
                this.$set(this.dwellTime, 'datasets', dataset);
                this.$set(this.dwellTime, 'data', Object.values(data[1]));
            },
            getTime: function (time) {
                switch (time) {
                    case 'today':
                        return 'hourly/today';
                    case 'yesterday':
                        return 'hourly/yesterday';
                    case 'lastweek':
                        return 'daily/lastweek';
                    case 'lastmonth':
                        return 'daily/lastmonth';
                    default:
                        return 'hourly/today';
                }
            }
        },
        components: {
            Proximity,
            DwellTime
        }
    }

</script>

<style>

</style>
