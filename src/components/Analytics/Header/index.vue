<template>
    <div>
        <b-card-group deck class = 'mb-3'>
            <b-card bg-variant = 'primary' text-variant = 'white' header = 'Total Connected' class = 'text-center'>
                <p class = 'card-text headers-text-value'>{{ totalConnectedCount }}</p>
            </b-card>
            <b-card bg-variant = 'primary' text-variant = 'white' header = 'Total Passerby' class = 'text-center'>
                <p class = 'card-text headers-text-value'>{{ totalPasserbyCount }}</p>
            </b-card>
            <b-card bg-variant = 'primary' text-variant = 'white' header = 'Total Visitor' class = 'text-center'>
                <p class = 'card-text headers-text-value'>{{ totalVisitorCount }}</p>
            </b-card>
        </b-card-group>
        <b-card-group deck class = 'mb-3'>
            <b-card bg-variant = 'info' text-variant = 'white' header = 'Average Dwell Time' class = 'text-center'>
                <p class = 'card-text headers-text-value'>{{ averageDwell }}</p>
            </b-card>
            <b-card bg-variant = 'info' text-variant = 'white' header = 'Peak Hour' class = 'text-center'>
                <p class = 'card-text headers-text-value'>{{ peakHour }}</p>
            </b-card>
            <b-card bg-variant = 'info' text-variant = 'white' header = 'Conversion Rate' class = 'text-center'>
                <p class = 'card-text headers-text-value'>{{ conversionRate }}</p>
            </b-card>
        </b-card-group>
        <b-card-group deck class = 'mb-3'>
            <b-card bg-variant = 'secondary' text-variant = 'white' header = 'Top Device Maker' class = 'text-center'>
                <p class = 'card-text headers-text-value'>{{ topDeviceMaker }}</p>
            </b-card>
        </b-card-group>
        <section>
            <h3>Prediction for tomorrow:</h3>
        </section>
        <b-card-group deck class = 'mb-3'>
            <b-card bg-variant = 'dark' text-variant = 'white' header = 'Tomorrow Connected' class = 'text-center'>
                <p class = 'card-text headers-text-value'>{{ tomorrowConnected }}</p>
            </b-card>
            <b-card bg-variant = 'dark' text-variant = 'white' header = 'Tomorrow Passerby' class = 'text-center'>
                <p class = 'card-text headers-text-value'>{{ tomorrowPasserby }}</p>
            </b-card>
            <b-card bg-variant = 'dark' text-variant = 'white' header = 'Tomorrow Visitors' class = 'text-center'>
                <p class = 'card-text headers-text-value'>{{ tomorrowVisitors }}</p>
            </b-card>
        </b-card-group>
   </div>
</template>

<script>
    // API
    import { api } from '../../../API';

    // Instruments
    import { getAverageValue } from '../../../instruments';
    import moment from 'moment';

    export default {
        name: 'Header',
        props: [ 'time', 'range', 'toggleFetch', 'setNotification' ],
        data () {
            return ({
                totalConnectedCount: 0,
                totalPasserbyCount: 0,
                totalVisitorCount: 0,
                averageDwell: 0,
                conversionRate: 0,
                topDeviceMaker: '?',
                peakHour: '? - ?',
                tomorrowConnected: 0,
                tomorrowPasserby: 0,
                tomorrowVisitors: 0,
            });
        },
        async mounted () {
            try {
                this.toggleFetch(true);

                await this.get();
                await this.predictTomorrow();
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

                    await this.get();
                } catch (e) {
                    this.setNotification();
                } finally {
                    this.toggleFetch(false);
                }
            },
            range: async function () {
                try {
                    this.toggleFetch(true);

                    await this.get();
                } catch (e) {
                    this.setNotification();
                } finally {
                    this.toggleFetch(false);
                }
            },
        },
        methods: {
            get: async function () {
                let url = `/presence/v1/kpisummary/${this.time}?siteId=${api.siteId}`;

                if (this.range[0] !== null && this.range[1] !== null) {
                    const startDate = moment(this.range[0]).format('YYYY-MM-DD');
                    const endDate = moment(this.range[1]).format('YYYY-MM-DD');

                    url = `/presence/v1/kpisummary?siteId=${api.siteId}&startDate=${startDate}&endDate=${endDate}`;
                }
                const data = await api.presence.get(url);

                this.averageDwell = Math.round(data.averageDwell);
                this.totalConnectedCount = data.totalConnectedCount;
                this.totalPasserbyCount = data.totalPasserbyCount;
                this.totalVisitorCount = data.totalVisitorCount;
                this.conversionRate = data.conversionRate;
                this.topDeviceMaker = data.topManufacturers.name;

                if (data.peakSummary) {
                    this.peakHour = `${data.peakSummary.peakHour}:00 - ${data.peakSummary.peakHour + 1}:00`;
                } else if (data.peakWeekSummary) {
                    this.peakHour = `${data.peakWeekSummary.peakHour}:00 - ${data.peakWeekSummary.peakHour + 1}:00`;
                } else if (data.peakMonthSummary) {
                    this.peakHour = `${data.peakMonthSummary.peakHour}:00 - ${data.peakMonthSummary.peakHour + 1}:00`;
                }
            },
            predictTomorrow: async function () {
                const urls = [
                    `/presence/v1/connected/daily/lastweek?siteId=${api.siteId}`,
                    `/presence/v1/passerby/daily/lastweek?siteId=${api.siteId}`,
                    `/presence/v1/visitor/daily/lastweek?siteId=${api.siteId}`
                ];
                const promises = urls.map(url => api.presence.get(url));
                const data = await Promise.all(promises);

                this.tomorrowConnected = getAverageValue(data[0]);
                this.tomorrowPasserby = getAverageValue(data[1]);
                this.tomorrowVisitors = getAverageValue(data[2]);
            }
        }
    }

</script>

<style>
    .headers-text-value {
        font-weight: bold;
        font-size: 20px;
    }
</style>
