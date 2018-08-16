<template>
    <div>
        <p class="name">my name is {{ myName }}</p>
        <p class="othername">my another name is {{ anotherName }}</p>
    </div>
</template>

<script type="text/javascript">
    export default {
        data() {
            return {
                myName: 'sherry',
                anotherName: this.anothername
            };
            
        },
        props: ['anothername']
    };
</script>

<style scoped>
    .name {
        color: #cf3f25
    }
    .othername {
        color: #0092db;
    }
</style>