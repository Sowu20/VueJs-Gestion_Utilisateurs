<template>
    <default-layout>
        <SingleUserTemplate />
    </default-layout>
</template>

<script>
    import SingleUserTemplate from '../templates/SingleUserTemplate.vue';
    import DefaultLayout from './Layout.vue';
    export default {
        components: {
            SingleUserTemplate,
            DefaultLayout
        },
        name: 'SingleUserPage'
    }
</script>