<template>
  <div v-if="hasTodos" class="summary-container">
    <h3 class="summary-title">Summary</h3>
    <div class="summary-stats">
      <div class="summary-stat">
        <span class="summary-label">High Priority Tasks</span>
        <span class="summary-value">{{ highPriorityTasks }}</span>
      </div>
      <div class="summary-stat">
        <span class="summary-label">Tasks Due Today</span>
        <span class="summary-value">{{ tasksDueToday }}</span>
      </div>
      <div class="summary-stat">
        <span class="summary-label">Overdue Tasks</span>
        <span class="summary-value">{{ overdueTasks }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoSummary',
  props: {
    highPriorityTasks: {
      type: Number,
      required: true
    },
    tasksDueToday: {
      type: Number,
      required: true
    },
    overdueTasks: {
      type: Number,
      required: true
    },
    hasTodos: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style scoped>
.summary-container {
  background-color: var(--summary-bg-color);
  border-radius: 8px;
  padding: 16px;
  margin-top: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.summary-title {
  font-size: 1.1rem;
  margin-top: 0;
  margin-bottom: 12px;
  color: var(--text-color);
}

.summary-stats {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.summary-stat {
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
}

.summary-label {
  color: var(--secondary-text-color);
}

.summary-value {
  font-weight: 600;
  color: var(--text-color);
}

@media (max-width: 600px) {
  .summary-container {
    padding: 12px;
  }
}
</style>
