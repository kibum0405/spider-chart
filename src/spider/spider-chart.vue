<template>
    <div>
		<v-row style="height:100vh;">
			<div class="checkpoints-container">
				<div v-for="part in perspectives" style="padding:16px">
					<div>{{ part.partName }}</div>
					<div v-for="partDetail in part.details">
						<h2>{{ partDetail.criteria }}</h2>
						<div v-for="(level, levelIndex) in partDetail.levels" :key="levelIndex">
							<h3 class="clearfix" style="margin:15px 0px 2px 0px;">
								<div style="float: left;">Level {{ levelIndex + 1}}</div>
								<div v-if="level.Objective">&nbsp;({{ level.Objective }})</div>
							</h3>
							<label v-for="(checkpoint, checkpointIndex) in level.checkpoints" :key="checkpointIndex">
							<div style="display:flex;">
								<input type="checkbox" v-model="checkpoint.checked" @change="updateLevelCompletion(partDetail, level)">
								<div style="margin:4px 0px 0px 4px;">{{ checkpoint.text }}</div>
							</div>
							</label>
						</div>
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
				<div v-for="part in perspectives"
					class="clearfix"
					style="margin:5px;"
				>
					<div style="width:16px; height:16px; float: left; border-radius: 5px; margin-right:5px;"
						:style="{ backgroundColor: part.partColor }"
					></div>
					<div style="font-weight: 500;">{{ part.partName }}</div>
				</div>
				<svg :width="chartWidth" :height="chartHeight">
					<g :transform="`translate(${chartCenterX}, ${chartCenterY})`">
						<g v-for="(detail, index) in getAllDetail(perspectives)" :key="detail.detail.criteria">
							<line
								:x1="0"
								:y1="0"
								:x2="getCoordinate(chartRadius, index, getDataLength(perspectives))[0]"
								:y2="getCoordinate(chartRadius, index, getDataLength(perspectives))[1]"
								:stroke="detail.color"
							/>
							<text
								:x="getCoordinate(chartRadius + labelOffset, index, getDataLength(perspectives))[0]"
								:y="getCoordinate(chartRadius + labelOffset, index, getDataLength(perspectives))[1]"
								dominant-baseline="middle"
								text-anchor="middle"
							>
								{{ detail.detail.criteria }}
							</text>
						</g>
						<g>
							<polygon
								:points="getPolygonPoints(getDataArray(perspectives))"
								fill="rgba(75, 192, 192, 0.2)"
								stroke="rgba(75, 192, 200, 1)"
							/>
							<circle
								v-for="(value, index) in getDataArray(perspectives)"
								:key="`data-${index}`"
								:cx="getCoordinate(chartRadius * (value / maxDataValue), index, getDataLength(perspectives))[0]"
								:cy="getCoordinate(chartRadius * (value / maxDataValue), index, getDataLength(perspectives))[1]"
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
			lineIndex: -1,
			perspectives: {
				biz: {},
				dev: {},
				ops: {}
			},
			initPerspectives: {	
				biz: {
					partIndex: 0,
					partName: 'Biz',
					partColor: 'rgba(100, 149, 237, 1)',
					details: [
						{
							criteria: '1',
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
							criteria: '2',
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
						// 여기에 추가적인 비즈니스 요건 분석 정보를 넣으세요.
					],
				},
				dev: {
					partIndex: 1,
					partName: 'Dev',
					partColor: 'rgba(60, 179, 113, 1)',
					details: [
						{
							criteria: '3',
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
						// 여기에 추가적인 개발 요건 분석 정보를 넣으세요.
					],
				},
				ops: {
					partIndex: 2,
					partName: 'Ops',
					partColor: 'rgba(138, 43, 226, 1)',
					details: [
						{
							criteria: '4',
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
						// 여기에 추가적인 운영 요건 분석 정보를 넣으세요.
					],
				},
			},
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
			this.lineIndex = -1;
			if( item.perspectives == null ) {
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
			Object.values(this.perspectives).forEach(part => {
				part.details.forEach(detail => {
					const criteria = detail.criteria;
					const levels = detail.levels.map(level => ({
						checkpoints: level.checkpoints.map(checkpoint => {
							if (checkpoint.checked) {
								this.$emit('changeCheckpointSave');
							}
							return checkpoint;
						})
					}));
				});
			});
		},
		loadCheckpointsState() {
			const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
			if (savedState) {
				const checkpointsState = JSON.parse(savedState);
				Object.values(this.perspectives).forEach((part, pIndex) => {
					const savedPart = checkpointsState[Object.keys(this.perspectives)[pIndex]];
					if (savedPart) {
						part.details.forEach((detail, lIndex) => {
							detail.levels.forEach((level, cIndex) => {
								level.checkpoints.forEach((checkpoint, ckIndex) => {
									checkpoint.checked = savedPart.details[lIndex].levels[cIndex].checkpoints[ckIndex].checked;
								});
								this.updateLevelCompletion(detail, level);
							});
						});
					}
				});
			} else {
				// localStorage에 데이터가 없을 경우 initPerspectives로 초기화
				this.perspectives = _.cloneDeep(this.initPerspectives);
			}
		},
		checkAllLevelsCompletion() {
			this.isAllLevelsCompleted = this.getAllDetail(this.perspectives).every(detailObj => 
				detailObj.detail.levels.every(level => level.isCompleted)
			);
		},
		getDataArray(perspectives) {
			return this.getAllDetail(perspectives).map(detail => {
				let completedLevelsCount = 0;
				if (detail.detail && detail.detail.levels) {
					detail.detail.levels.forEach(level => {
						if (level.isCompleted) {
							completedLevelsCount += 1;
						}
					});
				}
				return completedLevelsCount;
			});
		},
		getDataLength(perspectives) {
			let count = 0;
			Object.keys(perspectives).forEach(key => {
				var perspective = perspectives[key]
				perspective.details.forEach(detail => {
					count += 1;
				});
			});
			return count;
		},
		getAllDetail(perspectives) {
			var allDetail = [];
			Object.keys(perspectives).forEach(key => {
				var perspective = perspectives[key];
				if(perspective.details != null) {
					perspective.details.forEach(detail => {
						allDetail.push({ 
							detail: detail,
							color: perspective.partColor
						});
					});
				}
			});
			return allDetail;
		},
	}
};
</script>
  
<style>

</style>
  
  