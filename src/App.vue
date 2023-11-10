<template>
	<div style="display: flex;">
		<div class="tree-item-list">
			<v-text-field
				label="새 그룹 이름"
				v-model="newGroupName"
				@keyup.enter="addNewGroup()"
			></v-text-field>

			<v-treeview
				:items.sync='treeItems'
				activatable
				item-key="name"
				@click.stop
				style="cursor: pointer;"
				return-object
				@update:active="handleTreeItemClick"
			>
				<template v-slot:prepend="{ item }">
					<v-icon v-if="!item.children" small>mdi-account</v-icon>
					<v-icon v-if="item.children" small>mdi-domain</v-icon>
					<v-text-field
						v-if="item.children && isActive(item)"
						label="새 구성원 이름"
						dense
						flat
						hide-details
						v-model="newMemberName"
						@click.stop
						@keyup.enter="addNewMember(item)"
						class="insert-member-field"
					>
						<template v-slot:append>
							<v-icon
								small
								@click.stop="deactivateTextField(item.name)"
							>
								mdi-close
							</v-icon>
						</template>
					</v-text-field>
				</template>
				<template v-slot:append="{ item }">
					<v-btn icon small>
						<v-icon v-if="item.children && !isActive(item)" @click.stop="activateTextField(item.name)" small>mdi-plus</v-icon>
					</v-btn>
					<v-btn icon small>
						<v-icon
							small
							class="delete-icon"
							@click.stop="item.children ? deleteGroup(item.name) : deleteMember(item.parent, item.name)"
						>
							mdi-delete
						</v-icon>
					</v-btn>
				</template>
			</v-treeview>
		</div>
		<spiderChart 
			@changeCheckpointSave="saveToLocalStorage"
			ref="mSpiderChart"
			style="flex: 1;"
		/>
	</div>
</template>

<script>
import spiderChart from './spider/spider-chart';

export default {
	components: {
		spiderChart,
	},
	computed: {
	},
	data() {
		return {
			open: [],
			newGroupName: '',
			newMemberName: '',
			activeGroup: null,
			treeItems: [],
			selectedItem: null,
		}
	},
	mounted() {
		this.loadFromLocalStorage();
	},
	methods: {
		handleTreeItemClick(item) {
			this.$refs.mSpiderChart.selectedTree(item[0])
		},
		activateTextField(groupName) {
			this.activeGroup = groupName;
		},
		deactivateTextField(groupName) {
			if (this.activeGroup === groupName) {
				this.activeGroup = null;
			}
		},
		loadFromLocalStorage() {
			const storedTreeItems = localStorage.getItem('treeItems');
			if (storedTreeItems) {
				this.treeItems = JSON.parse(storedTreeItems);
			}
		},
		saveToLocalStorage() {
			localStorage.setItem('treeItems', JSON.stringify(this.treeItems));
		},
		addNewGroup() {
			if (this.newGroupName.trim()) {
				const newGroup = {
					name: this.newGroupName,
					children: [],
					nodeLevel: 0,
					perspectives: null,
				};
				this.treeItems.push(newGroup);
				this.newGroupName = '';
				this.saveToLocalStorage();
			}
		},
		addNewMember(item) {
			if (this.newMemberName.trim()) {
				const newItem = {
					name: this.newMemberName,
					children: [],
					nodeLevel: item.nodeLevel + 1,
					perspectives: null
				};
				if (!item.children) {
					this.$set(item, 'children', []);
				}
				item.children.push(newItem);
				this.newMemberName = '';
				this.saveToLocalStorage();
			}
		},

		handleActiveChange(active) {
			this.activeGroup = active[0] || null;
		},
		isActive(item) {
			return this.activeGroup === item.name;
		},
		findItemAndDelete(items, name) {
			for (let i = 0; i < items.length; i++) {
				if (items[i].name === name) {
					items.splice(i, 1);
					return true;
				} else if (items[i].children && items[i].children.length > 0) {
					if (this.findItemAndDelete(items[i].children, name)) {
						return true;
					}
				}
			}
			return false;
		},

		deleteMember(parentName, memberName) {
			this.findItemAndDelete(this.treeItems, memberName);
			this.saveToLocalStorage();
		},
		deleteGroup(groupName) {
			this.findItemAndDelete(this.treeItems, groupName);
			this.saveToLocalStorage();
		},
	},
};
</script>

<style>
.tree-item-list {
	min-width:200px;
	padding:10px;
}
.tree-item-list .v-treeview-node__toggle {
	display: none;	
}
.delete-icon {
  margin-left: auto;
}
</style>

