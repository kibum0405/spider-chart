<template>
    <div>
        <div style="margin-left:20px; font-size:20px; font-weight:500; color:#757575">개발팀 > 박기범</div>
        <div align="start">
            <div>
                <img :src="user.avatar"
                    class="user-avatar"
                />
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            user: {
                avatar: 'https://via.placeholder.com/150'
            },
        };
    },
    methods: {
	},
};
</script>
  
<style>
.user-month-list .v-list-group__header {
    padding:0px;
}
  
.user-avatar {
    border-radius: 50%;
    width: 100px;
    height: 100px;
    margin-bottom: 20px;
}
</style>
  