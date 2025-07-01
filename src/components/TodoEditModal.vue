<template>
  <div v-if="todo" class="modal-overlay" @click.self="cancelEdit">
    <div class="modal-content" :class="{ 'dark-mode': isDarkMode }">
      <h3 class="modal-title">Edit Todo</h3>
      
      <div class="form-group">
        <label for="edit-text">Task</label>
        <input 
          id="edit-text"
          type="text" 
          v-model="editedText" 
          class="form-control"
          aria-label="Edit todo text"
        />
      </div>
      
      <div class="form-group">
        <label for="edit-priority">Priority</label>
        <select 
          id="edit-priority"
          v-model="editedPriority" 
          class="form-control"
          aria-label="Edit priority"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="edit-date">Due Date</label>
        <input 
          id="edit-date"
          type="date" 
          v-model="editedDueDate" 
          class="form-control"
          aria-label="Edit due date"
        />
      </div>
      
      <div class="modal-actions">
        <button 
          @click="saveEdit"
          class="save-btn"
          :disabled="!editedText.trim()"
        >
          Save
        </button>
        <button 
          @click="cancelEdit"
          class="cancel-btn"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoEditModal',
  props: {
    todo: {
      type: Object,
      default: null
    },
    isDarkMode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      editedText: '',
      editedPriority: 'medium',
      editedDueDate: ''
    }
  },
  watch: {
    todo: {
      immediate: true,
      handler(newTodo) {
        if (newTodo) {
          this.editedText = newTodo.text
          this.editedPriority = newTodo.priority
          this.editedDueDate = newTodo.dueDate
        }
      }
    }
  },
  methods: {
    saveEdit() {
      if (!this.editedText.trim()) return
      
      this.$emit('save', {
        id: this.todo.id,
        text: this.editedText.trim(),
        priority: this.editedPriority,
        dueDate: this.editedDueDate
      })
    },
    cancelEdit() {
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: var(--modal-bg-color);
  border-radius: 8px;
  padding: 24px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.modal-title {
  margin-top: 0;
  margin-bottom: 20px;
  color: var(--text-color);
  font-size: 1.2rem;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-size: 0.9rem;
  color: var(--secondary-text-color);
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 1rem;
  background-color: var(--input-bg-color);
  color: var(--text-color);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

.save-btn, .cancel-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.save-btn {
  background-color: var(--primary-color);
  color: white;
}

.save-btn:hover:not(:disabled) {
  background-color: var(--primary-color-hover);
}

.save-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.cancel-btn {
  background-color: var(--cancel-btn-bg);
  color: var(--cancel-btn-text);
}

.cancel-btn:hover {
  background-color: var(--cancel-btn-hover-bg);
}
</style>
