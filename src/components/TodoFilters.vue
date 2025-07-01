<template>
  <div class="filters-container">
    <div class="filters">
      <button 
        v-for="filterOption in filterOptions" 
        :key="filterOption.value"
        @click="setFilter(filterOption.value)" 
        :class="['filter-btn', { active: currentFilter === filterOption.value }]"
        :aria-label="`Filter by ${filterOption.label}`"
        :aria-pressed="currentFilter === filterOption.value"
      >
        {{ filterOption.label }}
      </button>
    </div>
    
    <div class="sort-options">
      <span class="sort-label">Sort by:</span>
      <button 
        v-for="sortOption in sortOptions" 
        :key="sortOption.value"
        @click="setSort(sortOption.value)" 
        :class="['sort-btn', { active: currentSort === sortOption.value }]"
        :aria-label="`Sort by ${sortOption.label}`"
        :aria-pressed="currentSort === sortOption.value"
      >
        {{ sortOption.label }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoFilters',
  props: {
    currentFilter: {
      type: String,
      required: true,
      validator: value => ['all', 'active', 'completed'].includes(value)
    },
    currentSort: {
      type: String,
      required: true,
      validator: value => ['priority', 'dueDate'].includes(value)
    }
  },
  data() {
    return {
      filterOptions: [
        { label: 'All', value: 'all' },
        { label: 'Active', value: 'active' },
        { label: 'Completed', value: 'completed' }
      ],
      sortOptions: [
        { label: 'Priority', value: 'priority' },
        { label: 'Due Date', value: 'dueDate' }
      ]
    }
  },
  methods: {
    setFilter(filter) {
      this.$emit('update-filter', filter)
    },
    setSort(sort) {
      this.$emit('update-sort', sort)
    }
  }
}
</script>

<style scoped>
.filters-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 16px;
}

.filters, .sort-options {
  display: flex;
  gap: 8px;
  align-items: center;
}

.filter-btn, .sort-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  background-color: var(--filter-btn-bg);
  color: var(--filter-btn-text);
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.filter-btn:hover, .sort-btn:hover {
  background-color: var(--filter-btn-hover-bg);
}

.filter-btn.active, .sort-btn.active {
  background-color: var(--primary-color);
  color: white;
}

.sort-label {
  font-size: 0.9rem;
  color: var(--secondary-text-color);
  margin-right: 4px;
}

@media (max-width: 600px) {
  .filters-container {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .filters, .sort-options {
    width: 100%;
    justify-content: space-between;
  }
  
  .filter-btn, .sort-btn {
    flex: 1;
    text-align: center;
  }
}
</style>
