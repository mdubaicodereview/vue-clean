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
  </div>
</template>

<script>
export default {
  name: 'TodoForm',
  data() {
    return {
      todoText: '',
      priority: 'medium',
      dueDate: ''
    }
  },
  methods: {
    submitTodo() {
      const text = this.todoText.trim()
      if (text) {
        this.$emit('add-todo', {
          text,
          priority: this.priority,
          dueDate: this.dueDate
        })
        this.resetForm()
      }
    },
    resetForm() {
      this.todoText = ''
      this.priority = 'medium'
      this.dueDate = ''
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
}

.priority-select,
.date-input {
  padding: 8px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background-color: var(--input-bg-color);
  color: var(--text-color);
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

@media (max-width: 600px) {
  .form-options {
    flex-direction: column;
  }
  
  .priority-select,
  .date-input,
  .add-btn {
    width: 100%;
    margin-bottom: 8px;
  }
}
</style>
