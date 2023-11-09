<template>
    <div>
        <div style="margin-left:20px; font-size:20px; font-weight:500; color:#757575">개발팀 > 박기범</div>
        <div align="center" class="user-profile">
            <div>
                <img :src="user.avatar"
                    class="user-avatar"
                />
            </div>
            <div style="position: relative; text-align: start; margin-left:10px; margin-top:-40px;">
                
                <v-list dense style="position: absolute; text-align: center;">
                    <v-list-group
                        no-action
                        v-model="itemsOpen"
                        sub-group
                        class="user-month-list"
                    >
                    <template v-slot:activator>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>월별</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </template>

                    <v-list-item
                        v-for="month in months"
                        :key="month"
                    >
                        <v-list-item-content>
                            <v-list-item-title>{{ month }}월</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    </v-list-group>
                </v-list>
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
            itemsOpen: false,
            months: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
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
.user-profile {
    display: flex;
    justify-content: center; /* 가로 중앙 정렬 */
    align-items: center;
}
  
.user-avatar {
    border-radius: 50%;
    width: 100px;
    height: 100px;
    margin-bottom: 20px;
}
</style>
  