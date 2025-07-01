<template>
  <div class="todo-app" :class="{ 'dark-mode': isDarkMode }">
    <header class="app-header">
      <h1>{{ appTitle }}</h1>
      <ThemeToggle :isDarkMode="isDarkMode" @toggle-theme="toggleTheme" />
    </header>
    
    <TodoStats 
      :totalTodos="totalTodos" 
      :completedTodos="completedTodos" 
      :pendingTodos="pendingTodos" 
      :completionRate="completionRate"
    />
    
    <TodoFilters 
      :currentFilter="filter" 
      :currentSort="sortBy"
      :currentCategoryFilter="categoryFilter"
      :currentTagFilter="tagFilter"
      @update-filter="updateFilter"
      @update-sort="updateSort"
      @update-category-filter="updateCategoryFilter"
      @update-tag-filter="updateTagFilter"
    />
    
    <TodoForm @add-todo="addTodo" />
    
    <div v-if="processedTodos.length" class="todo-list-container">
      <ul class="todo-list">
        <TodoItem 
          v-for="todo in processedTodos" 
          :key="todo.id" 
          :todo="todo"
          @toggle="toggleTodo"
          @edit="startEdit"
          @delete="deleteTodo"
        />
      </ul>
    </div>
    <div v-else class="empty-state">
      <p>No tasks match your current filter</p>
    </div>
    
    <TodoSummary 
      v-if="totalTodos > 0"
      :highPriorityTasks="highPriorityTasks"
      :tasksDueToday="tasksDueToday"
      :overdueTasks="overdueTasks"
      :hasTodos="totalTodos > 0"
    />
    
    <TodoEditModal 
      :todo="editingTodo"
      :isDarkMode="isDarkMode"
      @save="saveEdit"
      @cancel="cancelEdit"
    />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'pinia'
import { useTodoStore } from './stores/todoStore'
import TodoItem from './components/TodoItem.vue'
import TodoForm from './components/TodoForm.vue'
import TodoFilters from './components/TodoFilters.vue'
import TodoStats from './components/TodoStats.vue'
import TodoSummary from './components/TodoSummary.vue'
import TodoEditModal from './components/TodoEditModal.vue'
import ThemeToggle from './components/ThemeToggle.vue'

export default {
  name: 'TodoApp',
  components: {
    TodoItem,
    TodoForm,
    TodoFilters,
    TodoStats,
    TodoSummary,
    TodoEditModal,
    ThemeToggle
  },
  data() {
    return {
      appTitle: 'Todo App',
      editingTodo: null
    }
  },
  computed: {
    ...mapState(useTodoStore, ['todos', 'filter', 'categoryFilter', 'tagFilter', 'sortBy', 'theme']),
    ...mapGetters(useTodoStore, [
      'processedTodos',
      'totalTodos',
      'completedTodos',
      'pendingTodos',
      'completionRate',
      'highPriorityTasks',
      'tasksDueToday',
      'overdueTasks'
    ]),
    isDarkMode() {
      return this.theme === 'dark'
    }
  },
  methods: {
    ...mapActions(useTodoStore, [
      'addTodo',
      'deleteTodo',
      'updateTodo',
      'toggleTodo',
      'setFilter',
      'setCategoryFilter',
      'setTagFilter',
      'setSortBy',
      'toggleTheme',
      'loadTodos'
    ]),
    updateFilter(filter) {
      this.setFilter(filter)
    },
    updateCategoryFilter(category) {
      this.setCategoryFilter(category)
    },
    updateTagFilter(tag) {
      this.setTagFilter(tag)
    },
    updateSort(sort) {
      this.setSortBy(sort)
    },
    startEdit(todo) {
      this.editingTodo = todo
    },
    saveEdit(updatedTodo) {
      this.updateTodo(updatedTodo.id, {
        text: updatedTodo.text,
        priority: updatedTodo.priority,
        dueDate: updatedTodo.dueDate
      })
      this.editingTodo = null
    },
    cancelEdit() {
      this.editingTodo = null
    }
  },
  mounted() {
    this.loadTodos()
  }
}
</script>

<style>
:root {
  --primary-color: #4caf50;
  --primary-color-hover: #3e8e41;
  --text-color: #333;
  --secondary-text-color: #666;
  --completed-text-color: #888;
  --border-color: #ddd;
  --background-color: #f9f9f9;
  --form-bg-color: #fff;
  --stats-bg-color: #f0f0f0;
  --summary-bg-color: #f0f0f0;
  --modal-bg-color: #fff;
  --input-bg-color: #fff;
  --filter-btn-bg: #eee;
  --filter-btn-text: #333;
  --filter-btn-hover-bg: #ddd;
  --edit-btn-bg: #eee;
  --edit-btn-text: #333;
  --edit-btn-hover-bg: #ddd;
  --delete-btn-bg: #ff5252;
  --delete-btn-text: #fff;
  --delete-btn-hover-bg: #ff3232;
  --cancel-btn-bg: #eee;
  --cancel-btn-text: #333;
  --cancel-btn-hover-bg: #ddd;
  --theme-toggle-bg: #eee;
  --theme-toggle-text: #333;
  --theme-toggle-hover-bg: #ddd;
  --priority-high-color: #ff5252;
  --priority-medium-color: #ffb142;
  --priority-low-color: #78e08f;
}

[data-theme="dark"] {
  --primary-color: #66bb6a;
  --primary-color-hover: #4caf50;
  --text-color: #e0e0e0;
  --secondary-text-color: #aaa;
  --completed-text-color: #777;
  --border-color: #444;
  --background-color: #121212;
  --form-bg-color: #1e1e1e;
  --stats-bg-color: #1e1e1e;
  --summary-bg-color: #1e1e1e;
  --modal-bg-color: #1e1e1e;
  --input-bg-color: #2c2c2c;
  --filter-btn-bg: #2c2c2c;
  --filter-btn-text: #e0e0e0;
  --filter-btn-hover-bg: #3c3c3c;
  --edit-btn-bg: #2c2c2c;
  --edit-btn-text: #e0e0e0;
  --edit-btn-hover-bg: #3c3c3c;
  --delete-btn-bg: #ff5252;
  --delete-btn-text: #fff;
  --delete-btn-hover-bg: #ff3232;
  --cancel-btn-bg: #2c2c2c;
  --cancel-btn-text: #e0e0e0;
  --cancel-btn-hover-bg: #3c3c3c;
  --theme-toggle-bg: #2c2c2c;
  --theme-toggle-text: #e0e0e0;
  --theme-toggle-hover-bg: #3c3c3c;
  --priority-high-color: #ff5252;
  --priority-medium-color: #ffb142;
  --priority-low-color: #78e08f;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  line-height: 1.6;
  color: var(--text-color);
  background-color: var(--background-color);
  transition: background-color 0.3s, color 0.3s;
}

.todo-app {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

h1 {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-color);
}

.todo-list-container {
  margin: 1.5rem 0;
}

.todo-list {
  list-style-type: none;
  padding: 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: var(--secondary-text-color);
  background-color: var(--form-bg-color);
  border-radius: 8px;
  margin: 1.5rem 0;
}

/* Responsive design for mobile */
@media (max-width: 600px) {
  .todo-app {
    padding: 1rem;
  }
  
  .app-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  h1 {
    font-size: 1.5rem;
  }
}
</style>
