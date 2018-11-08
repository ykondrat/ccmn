<template>
    <b-navbar toggleable="md" type="dark" variant="dark">

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand to='/'>CCMN 42</b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
            <b-nav-item to='/analytics'>Analytics</b-nav-item>
            <b-nav-item to='/locations'>Locations</b-nav-item>
            <b-nav-item to='/users'>Users</b-nav-item>
            <b-nav-item to='/bot'>Bot</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
            <b-nav-form>
                <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
                <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form>
        </b-navbar-nav>

        </b-collapse>
    </b-navbar>
</template>

<script>
    export default {
        name: 'Navigation',
    }
</script>

<style scoped>

</style>
