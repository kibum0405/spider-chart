<template>
    <div>
		<v-row style="height:100vh;">
			<div class="checkpoints-container">
				<div v-for="(perspective, index) in perspectives" :key="index" style="padding:16px">
					<h2>{{ perspective.criteria }}</h2>
					<div v-for="(level, levelIndex) in perspective.levels" :key="levelIndex">
						<h3 class="clearfix" style="margin:15px 0px 2px 0px;">
							<div style="float: left;">Level {{ levelIndex + 1}}</div>
							<div v-if="level.Objective">&nbsp;({{ level.Objective }})</div>
						</h3>
						<label v-for="(checkpoint, checkpointIndex) in level.checkpoints" :key="checkpointIndex">
						<div style="display:flex;">
							<input type="checkbox" v-model="checkpoint.checked" @change="updateLevelCompletion(perspective, level)">
							<div style="margin:4px 0px 0px 4px;">{{ checkpoint.text }}</div>
						</div>
						</label>
					</div>
				</div>
		
				<div style="padding:0px 16px 10px 16px;">
					<h2 style="margin-bottom:4px;">결과</h2>
					<div v-if="isAllLevelsCompleted">모든 레벨이 완료되었습니다.</div>
					<div v-else>일부 레벨이 완료되지 않았습니다.</div>
				</div>
			</div>
			<v-card style="height:100%; flex:1;">
				<User style="padding:20px 0px 20px 0px;"/>
				<v-divider/>
				<svg :width="chartWidth" :height="chartHeight">
					<g :transform="`translate(${chartCenterX}, ${chartCenterY})`">
						<g v-for="(perspective, index) in perspectives" :key="perspective.criteria">
							<line
								:x1="0"
								:y1="0"
								:x2="getCoordinate(chartRadius, index, perspectives.length)[0]"
								:y2="getCoordinate(chartRadius, index, perspectives.length)[1]"
								stroke="lightgray"
							/>
							<text
								:x="getCoordinate(chartRadius + labelOffset, index, perspectives.length)[0]"
								:y="getCoordinate(chartRadius + labelOffset, index, perspectives.length)[1]"
								dominant-baseline="middle"
								text-anchor="middle"
							>
								{{ perspective.criteria }}
							</text>
						</g>
						<g>
							<polygon
								:points="getPolygonPoints(getDataArray(perspectives))"
								fill="rgba(75, 192, 192, 0.2)"
								stroke="rgba(75, 192, 192, 1)"
							/>
							<polygon
								:points="getPolygonPoints(getDataArray(perspectives))"
								fill="rgba(192, 75, 192, 0.2)"
								stroke="rgba(192, 75, 192, 1)"
							/>
							<circle
								v-for="(value, index) in getDataArray(perspectives)"
								:key="`data-${index}`"
								:cx="getCoordinate(chartRadius * (value / maxDataValue), index, perspectives.length)[0]"
								:cy="getCoordinate(chartRadius * (value / maxDataValue), index, perspectives.length)[1]"
								:r="pointRadius"
								fill="rgba(75, 192, 192, 1)"
							/>
						</g>
					</g>
				</svg>
			</v-card>
		</v-row>
    </div>
</template>
  
<script>
import User from './user.vue'
const _ = require('lodash');

const LOCAL_STORAGE_KEY = 'checkpoints_state';

export default {
	name: 'spiderChart',
	components: {
		User
	},
	data() {
		return {
			isAllLevelsCompleted: false,
			perspectives: [],
			initPerspectives: [
				{
					criteria: '요건 분석',
					levels: [
						{
							Objective: '문서기반 요건분석',
							checkpoints: [
								{ text: '문서기반 요건분석', checked: false },
								{ text: '요구사항 관리도구(e.g.Jira)의 활용', checked: false },
								{ text: '유즈케이스 식별', checked: false },
								{ text: '의존성 분석', checked: false },
							],
							isCompleted: false,
						},
						{
							checkpoints: [
								{ text: '인터페이스 설계', checked: false },
								{ text: '데이터 액세스 계획', checked: false },
								{ text: '보안 및 인증 고려', checked: false },
								{ text: '에러 핸들링 정의', checked: false },
							],
							isCompleted: false,
						},
					],
				},
				{
					criteria: '요건 분석2',
					levels: [
						{
							Objective: '문서기반 요건분석',
							checkpoints: [
								{ text: '문서기반 요건분석', checked: false },
								{ text: '요구사항 관리도구(e.g.Jira)의 활용', checked: false },
								{ text: '유즈케이스 식별', checked: false },
								{ text: '의존성 분석', checked: false },
							],
							isCompleted: false,
						},
						{
							checkpoints: [
								{ text: '인터페이스 설계', checked: false },
								{ text: '데이터 액세스 계획', checked: false },
								{ text: '보안 및 인증 고려', checked: false },
								{ text: '에러 핸들링 정의', checked: false },
							],
							isCompleted: false,
						},
					],
				},
				{
					criteria: '데이터',
					levels: [
						{
							checkpoints: [
								{ text: '트랜잭션 관리', checked: false },
								{ text: '데이터 일관성 유지', checked: false },
							],
							isCompleted: false,
						},
						{
							checkpoints: [
								{ text: '개별 스키마 정의', checked: false },
								{ text: '다중 엔터프라이즈 데이터 조정', checked: false },
								{ text: '데이터 일관성 유지', checked: false },
							],
							isCompleted: false,
						},
					],
				},
			],
			chartWidth: 440,
			chartHeight: 440,
			chartCenterX: 200,
			chartCenterY: 200,
			chartRadius: 150,
			labelOffset: 20,
			maxDataValue: 5,
			pointRadius: 4,
		};
	},
	mounted() {
		this.loadCheckpointsState();
	},
	methods: {
		selectedTree(item) {
			if( item.perspectives.length == 0 ) {
				this.perspectives = _.cloneDeep(this.initPerspectives)
				item.perspectives = this.perspectives
			} else {
				this.perspectives = item.perspectives
			}
		},
		getCoordinate(radius, index, total) {
			const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
			const x = radius * Math.cos(angle);
			const y = radius * Math.sin(angle);
			return [x, y];
		},
		getPolygonPoints(data) {
			return data
			.map((dataPoint, index) => {
				const radius = this.chartRadius * (dataPoint / this.maxDataValue);
				return this.getCoordinate(radius, index, data.length).join(',');
			}).join(' ');
		},
		updateLevelCompletion(perspective, level) {
			level.isCompleted = level.checkpoints.every(checkpoint => checkpoint.checked);
			this.checkAllLevelsCompletion();
			this.changeCheckpointsState();
		},
		changeCheckpointsState() {
			this.perspectives.map(perspective => ({
				criteria: perspective.criteria,
				levels: perspective.levels.map(level => ({
					checkpoints: level.checkpoints.map(checkpoint => {
						checkpoint.checked
						this.$emit('changeCheckpointSave')
					})
				}))
			}));
		},
		loadCheckpointsState() {
			const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
			if (savedState) {
				const checkpointsState = JSON.parse(savedState);
				this.perspectives.forEach((perspective, pIndex) => {
					const savedPerspective = checkpointsState.find(p => p.criteria === perspective.criteria);
					if (savedPerspective) {
						perspective.levels.forEach((level, lIndex) => {
							level.checkpoints.forEach((checkpoint, cIndex) => {
								checkpoint.checked = savedPerspective.levels[lIndex].checkpoints[cIndex];
							});
							this.updateLevelCompletion(perspective, level);
						});
					}
				});
			}
		},
		checkAllLevelsCompletion() {
			this.isAllLevelsCompleted = this.perspectives.every(perspective => 
				perspective.levels.every(level => level.isCompleted)
			);
		},
		getDataArray(perspectives) {
			return perspectives.map(perspective => {
				let completedLevelsCount = 0;

				perspective.levels.forEach(level => {
				if (level.isCompleted) {
					completedLevelsCount += 1;
				}
				});

				return completedLevelsCount;
			});
		},
	}
};
</script>
  
<style>

</style>
  
  