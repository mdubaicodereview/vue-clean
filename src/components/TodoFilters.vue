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
    
    <div class="category-filters">
      <span class="filter-label">Category:</span>
      <button 
        @click="setCategoryFilter('all')" 
        :class="['filter-btn', { active: currentCategoryFilter === 'all' }]"
        aria-label="Show all categories"
      >
        All
      </button>
      <button 
        v-for="category in categories" 
        :key="category"
        @click="setCategoryFilter(category)" 
        :class="['filter-btn', { active: currentCategoryFilter === category }]"
        :aria-label="`Filter by ${category} category`"
      >
        {{ category }}
      </button>
    </div>
    
    <div class="tag-filters">
      <span class="filter-label">Tag:</span>
      <button 
        @click="setTagFilter('all')" 
        :class="['filter-btn', { active: currentTagFilter === 'all' }]"
        aria-label="Show all tags"
      >
        All
      </button>
      <button 
        v-for="tag in tags" 
        :key="tag"
        @click="setTagFilter(tag)" 
        :class="['filter-btn', { active: currentTagFilter === tag }]"
        :aria-label="`Filter by ${tag} tag`"
      >
        {{ tag }}
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
import { mapState } from 'pinia'
import { useTodoStore } from '../stores/todoStore'

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
      validator: value => ['priority', 'dueDate', 'category'].includes(value)
    },
    currentCategoryFilter: {
      type: String,
      required: true,
      default: 'all'
    },
    currentTagFilter: {
      type: String,
      required: true,
      default: 'all'
    }
  },
  computed: {
    ...mapState(useTodoStore, ['categories', 'tags'])
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
        { label: 'Due Date', value: 'dueDate' },
        { label: 'Category', value: 'category' }
      ]
    }
  },
  methods: {
    setFilter(filter) {
      this.$emit('update-filter', filter)
    },
    setCategoryFilter(category) {
      this.$emit('update-category-filter', category)
    },
    setTagFilter(tag) {
      this.$emit('update-tag-filter', tag)
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
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
}

.filters, .category-filters, .tag-filters, .sort-options {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
}

.filter-label, .sort-label {
  font-size: 0.9rem;
  color: var(--secondary-text-color);
  margin-right: 4px;
  white-space: nowrap;
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

@media (max-width: 600px) {
  .filters-container {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .filters, .category-filters, .tag-filters, .sort-options {
    width: 100%;
    overflow-x: auto;
    padding-bottom: 8px;
  }
  
  .filter-btn, .sort-btn {
    flex-shrink: 0;
  }
}
</style>
