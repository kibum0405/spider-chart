<!-- <template>
  <div>
    <div v-for="(perspective, index) in perspectives" :key="index">
      <h2>{{ perspective.name }}</h2>
      <div v-for="(level, levelIndex) in perspective.levels" :key="levelIndex">
        <h3>Level {{ levelIndex + 1 }}</h3>
        <div>
          <label v-for="(checkpoint, checkpointIndex) in level.checkpoints" :key="checkpointIndex">
            <input type="checkbox" v-model="checkpoint.checked" @change="updateLevelCompletion(perspective, level)">
            {{ checkpoint.text }}123
          </label>
        </div>
      </div>
    </div>

    <div>
      <h2>Result</h2>
      <p v-if="isAllLevelsCompleted">All levels are completed!</p>
      <p v-else>Some levels are not completed.</p>
    </div>

  </div>
</template>

<script>

export default {
  data() {
    return {
      perspectives: [
        {
          name: '기능분해',
          levels: [
            {
              checkpoints: [
                { text: '비즈니스 역량 도출', checked: false },
                { text: '기능 정의', checked: false },
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
          name: '데이터 관점',
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
    };
  },
  mounted() {
  },
  methods: {
    updateLevelCompletion(perspective, level) {
      level.isCompleted = level.checkpoints.every(checkpoint => checkpoint.checked);
      this.checkAllLevelsCompletion(perspective);
    },
    checkAllLevelsCompletion(perspective) {
      perspective.isCompleted = perspective.levels.every(level => level.isCompleted);
    },
  },
};
</script> -->
