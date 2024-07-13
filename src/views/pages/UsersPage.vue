<template>
    <default-layout>
        <UsersTemplate />
    </default-layout>
</template>

<script>
    import UsersTemplate from '../templates/UsersTemplate.vue';
    import DefaultLayout from './Layout.vue';
    export default {
        components: {
            UsersTemplate,
            DefaultLayout
        },
        name: 'UsersPage',
    }
</script>
