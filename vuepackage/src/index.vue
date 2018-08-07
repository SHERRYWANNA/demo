<style type="text/css">
	html {
		* {
			margin: 0;
		}
	}
</style>

<template>
	<div class="msg-wapper">
		<div class="msg_name">My name is: {{myName}}</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: 'Msg',
		data() {
			return {}
		},
		props: {
			myName: {
				type: String,
				default: () => 'sherry'
			}
		},
		methods: {
			getName: () => this.myName
		}
	};
</script>