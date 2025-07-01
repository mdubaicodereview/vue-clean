<template>
  <li :class="[
    'todo-item', 
    { 'completed': todo.completed },
    `priority-${todo.priority}`
  ]">
    <div class="todo-content">
      <input 
        type="checkbox" 
        :checked="todo.completed" 
        @change="toggleTodo"
        aria-label="Toggle completion status"
      />
      <div class="todo-text">
        <span :class="{ 'completed-text': todo.completed }">{{ todo.text }}</span>
        <small v-if="todo.dueDate" class="due-date">
          Due: {{ formatDate(todo.dueDate) }}
        </small>
      </div>
      <div class="todo-actions">
        <button 
          @click="$emit('edit', todo)"
          class="edit-btn"
          aria-label="Edit todo"
        >
          Edit
        </button>
        <button 
          @click="$emit('delete', todo.id)"
          class="delete-btn"
          aria-label="Delete todo"
        >
          Delete
        </button>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    todo: {
      type: Object,
      required: true,
      validator: (todo) => {
        return todo.hasOwnProperty('id') && 
               todo.hasOwnProperty('text') && 
               todo.hasOwnProperty('completed') &&
               todo.hasOwnProperty('priority')
      }
    }
  },
  methods: {
    toggleTodo() {
      this.$emit('toggle', this.todo.id)
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString()
    }
  }
}
</script>

<style scoped>
.todo-item {
  padding: 12px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  transition: background-color 0.2s;
}

.todo-content {
  display: flex;
  align-items: center;
  width: 100%;
}

.todo-text {
  margin-left: 12px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.completed-text {
  text-decoration: line-through;
  color: var(--completed-text-color);
}

.due-date {
  font-size: 0.8rem;
  color: var(--secondary-text-color);
  margin-top: 4px;
}

.todo-actions {
  display: flex;
  gap: 8px;
}

.todo-actions button {
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.edit-btn {
  background-color: var(--edit-btn-bg);
  color: var(--edit-btn-text);
}

.delete-btn {
  background-color: var(--delete-btn-bg);
  color: var(--delete-btn-text);
}

.edit-btn:hover {
  background-color: var(--edit-btn-hover-bg);
}

.delete-btn:hover {
  background-color: var(--delete-btn-hover-bg);
}

.priority-high {
  border-left: 4px solid var(--priority-high-color);
}

.priority-medium {
  border-left: 4px solid var(--priority-medium-color);
}

.priority-low {
  border-left: 4px solid var(--priority-low-color);
}

@media (max-width: 600px) {
  .todo-content {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .todo-text {
    margin: 8px 0;
    width: 100%;
  }
  
  .todo-actions {
    width: 100%;
    justify-content: flex-end;
    margin-top: 8px;
  }
}
</style>
