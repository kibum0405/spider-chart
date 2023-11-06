<template>
    <div class="user-profile">
        <img :src="user.avatar" alt="User's avatar" class="user-avatar">
        <h2>{{ user.name }}</h2>
        <div>{{ user.bio }}</div>
        <v-card>123</v-card>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            user: {
                name: 'John Doe',
                bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                avatar: 'https://via.placeholder.com/150'
            }
        };
    },
    methods: {
		emitShowSpiderChart() {
			this.$emit('show-spider-chart');
		},
	},
};
</script>
  
<style>
.user-profile {
    text-align: center;
}
  
.user-avatar {
    border-radius: 50%;
    width: 150px;
    height: 150px;
    object-fit: cover;
    margin-bottom: 20px;
}
</style>
  