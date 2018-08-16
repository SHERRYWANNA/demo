<template>
    <p class="name">my name is {{ name }}</p>
</template>

<script type="text/javascript">
    export default {
        data: () => ({
            name: 'sherry'
        }),
        props: ['name']
    };
</script>

<style scoped>
    .name {
        color: #cf3f25
    }
</style>