<template>
  <div class="todo-form">
    <input 
      type="text" 
      v-model="todoText" 
      @keyup.enter="submitTodo"
      placeholder="Add a new task"
      aria-label="New todo text"
      class="todo-input"
    />
    <div class="form-options">
      <select 
        v-model="priority" 
        aria-label="Priority"
        class="priority-select"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      
      <select 
        v-model="category" 
        aria-label="Category"
        class="category-select"
      >
        <option value="">No Category</option>
        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
      </select>
      
      <select 
        v-model="selectedTag" 
        aria-label="Tag"
        class="tag-select"
        @change="addTagToSelection"
      >
        <option value="">Add Tag</option>
        <option v-for="tag in availableTags" :key="tag" :value="tag">{{ tag }}</option>
      </select>
      
      <input 
        type="date" 
        v-model="dueDate" 
        aria-label="Due date"
        class="date-input"
      />
      <button 
        @click="submitTodo"
        class="add-btn"
        :disabled="!todoText.trim()"
      >
        Add
      </button>
    </div>
    
    <div v-if="selectedTags.length" class="selected-tags">
      <span v-for="tag in selectedTags" :key="tag" class="tag-pill">
        {{ tag }}
        <button @click="removeTag(tag)" class="remove-tag" aria-label="Remove tag">×</button>
      </span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useTodoStore } from '../stores/todoStore'

export default {
  name: 'TodoForm',
  data() {
    return {
      todoText: '',
      priority: 'medium',
      category: '',
      selectedTag: '',
      selectedTags: [],
      dueDate: ''
    }
  },
  computed: {
    ...mapState(useTodoStore, ['categories', 'tags']),
    availableTags() {
      return this.tags.filter(tag => !this.selectedTags.includes(tag))
    }
  },
  methods: {
    submitTodo() {
      const text = this.todoText.trim()
      if (text) {
        this.$emit('add-todo', {
          text,
          priority: this.priority,
          dueDate: this.dueDate,
          category: this.category,
          tags: [...this.selectedTags]
        })
        this.resetForm()
      }
    },
    resetForm() {
      this.todoText = ''
      this.priority = 'medium'
      this.category = ''
      this.selectedTags = []
      this.selectedTag = ''
      this.dueDate = ''
    },
    addTagToSelection() {
      if (this.selectedTag && !this.selectedTags.includes(this.selectedTag)) {
        this.selectedTags.push(this.selectedTag)
        this.selectedTag = ''
      }
    },
    removeTag(tag) {
      this.selectedTags = this.selectedTags.filter(t => t !== tag)
    }
  }
}
</script>

<style scoped>
.todo-form {
  margin-bottom: 20px;
  border-radius: 8px;
  background-color: var(--form-bg-color);
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.todo-input {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  margin-bottom: 12px;
  font-size: 1rem;
  background-color: var(--input-bg-color);
  color: var(--text-color);
}

.form-options {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.priority-select,
.date-input,
.category-select,
.tag-select {
  padding: 8px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background-color: var(--input-bg-color);
  color: var(--text-color);
  min-width: 120px;
}

.add-btn {
  padding: 8px 16px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.add-btn:hover:not(:disabled) {
  background-color: var(--primary-color-hover);
}

.add-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.selected-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.tag-pill {
  display: inline-flex;
  align-items: center;
  background-color: var(--primary-color);
  color: white;
  padding: 4px 8px;
  border-radius: 16px;
  font-size: 0.8rem;
}

.remove-tag {
  background: none;
  border: none;
  color: white;
  margin-left: 4px;
  cursor: pointer;
  font-size: 1rem;
  line-height: 0.8;
  padding: 0 4px;
}

@media (max-width: 600px) {
  .form-options {
    flex-direction: column;
  }
  
  .priority-select,
  .category-select,
  .tag-select,
  .date-input,
  .add-btn {
    width: 100%;
    margin-bottom: 8px;
  }
}
</style>
