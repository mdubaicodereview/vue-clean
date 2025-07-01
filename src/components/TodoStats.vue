<template>
  <div class="stats-container">
    <div class="stat-item">
      <span class="stat-label">Total</span>
      <span class="stat-value">{{ totalTodos }}</span>
    </div>
    <div class="stat-item">
      <span class="stat-label">Completed</span>
      <span class="stat-value">{{ completedTodos }}</span>
    </div>
    <div class="stat-item">
      <span class="stat-label">Pending</span>
      <span class="stat-value">{{ pendingTodos }}</span>
    </div>
    <div class="stat-item">
      <span class="stat-label">Completion</span>
      <span class="stat-value">{{ completionRate }}%</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoStats',
  props: {
    totalTodos: {
      type: Number,
      required: true
    },
    completedTodos: {
      type: Number,
      required: true
    },
    pendingTodos: {
      type: Number,
      required: true
    },
    completionRate: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>
.stats-container {
  display: flex;
  justify-content: space-between;
  background-color: var(--stats-bg-color);
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.stat-label {
  font-size: 0.8rem;
  color: var(--secondary-text-color);
  margin-bottom: 4px;
}

.stat-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-color);
}

@media (max-width: 600px) {
  .stats-container {
    flex-wrap: wrap;
    gap: 12px;
  }
  
  .stat-item {
    flex-basis: 45%;
  }
}
</style>
