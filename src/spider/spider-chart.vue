<template>
    <div style="display:flex; width:100%;">
		<div class="checkpoints-container" style="height:100vh; overflow:auto;">
			<div v-for="(perspective, index) in perspectives" :key="index" style="padding:16px">
				<h2>{{ perspective.name }}</h2>
				<div v-for="(level, levelIndex) in perspective.levels" :key="levelIndex">
					<h3 style="margin-bottom:4px;">Level {{ levelIndex + 1 }}</h3>
					<label v-for="(checkpoint, checkpointIndex) in level.checkpoints" :key="checkpointIndex">
					<div style="display:flex;">
						<input type="checkbox" v-model="checkpoint.checked" @change="updateLevelCompletion(perspective, level)">
						<div>{{ checkpoint.text }}</div>
					</div>
					</label>
				</div>
			</div>
	
			<div style="padding:0px 16px 10px 16px;">
				<h2 style="margin-bottom:4px;">Result</h2>
				<div v-if="isAllLevelsCompleted">All levels are completed!</div>
				<div v-else>Some levels are not completed.</div>
			</div>
		</div>
		<div class="chart-container" style="background-color:red;">
			<User/>
			<svg :width="chartWidth" style="background-color:yellow; margin-top:20px; width:100%; height:100%;">
				<g :transform="`translate(${chartCenterX}, ${chartCenterY})`">
					<!-- Draw axes -->
					<g v-for="(axis, index) in chartData.labels" :key="index">
						<line
							:x1="0"
							:y1="0"
							:x2="getCoordinate(chartRadius, index, chartData.labels.length)[0]"
							:y2="getCoordinate(chartRadius, index, chartData.labels.length)[1]"
							stroke="lightgray"
						/>
						<text
							:x="getCoordinate(chartRadius + labelOffset, index, chartData.labels.length)[0]"
							:y="getCoordinate(chartRadius + labelOffset, index, chartData.labels.length)[1]"
							dominant-baseline="middle"
							text-anchor="middle"
						>
							{{ axis }}
						</text>
					</g>
		
					<!-- Draw data points -->
					<g>
						<polygon
							:points="getPolygonPoints(chartData.data)"
							fill="rgba(75, 192, 192, 0.2)"
							stroke="rgba(75, 192, 192, 1)"
						/>
						<polygon
							:points="getPolygonPoints(chartData.data2)"
							fill="rgba(192, 75, 192, 0.2)"
							stroke="rgba(192, 75, 192, 1)"
						/>
						<circle
							v-for="(dataPoint, index) in chartData.data"
							:key="index"
							:cx="getCoordinate(chartRadius * (dataPoint / maxDataValue), index, chartData.data.length)[0]"
							:cy="getCoordinate(chartRadius * (dataPoint / maxDataValue), index, chartData.data.length)[1]"
							:r="pointRadius"
							fill="rgba(75, 192, 192, 1)"
						/>
						<circle
							v-for="(dataPoint, index) in chartData.data2"
							:key="index"
							:cx="getCoordinate(chartRadius * (dataPoint / maxDataValue), index, chartData.data2.length)[0]"
							:cy="getCoordinate(chartRadius * (dataPoint / maxDataValue), index, chartData.data2.length)[1]"
							:r="pointRadius"
							fill="rgba(192, 75, 192, 1)"
						/>
					</g>
				</g>
			</svg>
		</div>
    </div>
</template>
  
<script>
import User from'./user.vue'
export default {
	components: {
		User
	},
	data() {
		return {
			isAllLevelsCompleted: false,
			perspectives: [
				{
					name: '요건 분석',
					levels: [
						{
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
						{
							checkpoints: [
								{ text: 'Ubiquitous language 정의', checked: false },
								{ text: 'Boundary 정의', checked: false },
								{ text: 'Anti-corruption layer 구현', checked: false },
								{ text: '도메인 이벤트 식별', checked: false },
							],
							isCompleted: false,
						},
						{
							checkpoints: [
								{ text: 'CQRS 모델 설계', checked: false },
								{ text: '이벤트 스토리지 구현', checked: false },
								{ text: '이벤트 드리븐 아키텍처 구축', checked: false },
								{ text: '이벤트 버전 관리',checked: false },
							],
							isCompleted: false,
						},
					],
				},
				{
					name: '데이터',
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
						{
							checkpoints: [
								{ text: '분산 데이터 관리', checked: false },
								{ text: '폴리글랏 퍼시스턴스', checked: false },
								{ text: '데이터 접근 및 관리', checked: false },
							],
							isCompleted: false,
						},
						{
							checkpoints: [
								{ text: '이벤트 기반 데이터 관리', checked: false },
								{ text: '이벤트 소싱 및 커맨드-쿼리 분리(CQRS)', checked: false },
								{ text: '데이터 일관성 관리', checked: false },
							],
							isCompleted: false,
						},
					],
				},
				// Add more perspectives here if needed
			],
			chartData: {
				labels: ['기능분해', '데이터', 'SW 아키텍처', 'Infra', '스트럭처', '배포', '팀구조'],
				data: [0, 0, 0, 0, 0, 0, 0],
				data2: [0, 0, 0, 0, 0, 0, 0],
			},
			chartWidth: 400,
			chartHeight: 400,
			chartCenterX: 200,
			chartCenterY: 200,
			chartRadius: 150,
			labelOffset: 20,
			maxDataValue: 5,
			pointRadius: 4,
		};
	},
	methods: {
		emitClose() {
			this.$emit('close');
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
			this.checkAllLevelsCompletion(perspective);
		},
		checkAllLevelsCompletion(perspective) {
			perspective.isCompleted = perspective.levels.every((level) => level.isCompleted);
			//  if (perspective.isCompleted) {
			const perspectiveIndex = this.chartData.labels.findIndex((label) => label === perspective.name);
			if (perspectiveIndex !== -1) {
				const lastCompletedLevelIndex = perspective.levels.findIndex((level) => !level.isCompleted) - 1;
				const value = lastCompletedLevelIndex !== -1 ? lastCompletedLevelIndex + 1 : this.chartData.labels.length;
				this.chartData.data[perspectiveIndex] = value;
				this.chartData.data2[perspectiveIndex] = value;
			}
		//}
		},
	}
};
</script>
  
<style>

</style>
  
  