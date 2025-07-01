<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content" role="dialog" aria-labelledby="modal-title">
      <h2 id="modal-title" class="modal-title">Edit Todo</h2>
      
      <div class="form-group">
        <label for="edit-text">Task</label>
        <input 
          id="edit-text" 
          v-model="editedTodo.text" 
          class="form-input"
          placeholder="Task description"
        />
      </div>
      
      <div class="form-group">
        <label for="edit-priority">Priority</label>
        <select id="edit-priority" v-model="editedTodo.priority" class="form-select">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="edit-category">Category</label>
        <select id="edit-category" v-model="editedTodo.category" class="form-select">
          <option value="">No Category</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="edit-tag">Tags</label>
        <div class="tag-selection">
          <select 
            id="edit-tag" 
            v-model="selectedTag" 
            class="form-select"
            @change="addTagToSelection"
          >
            <option value="">Add Tag</option>
            <option v-for="tag in availableTags" :key="tag" :value="tag">{{ tag }}</option>
          </select>
          
          <div v-if="editedTodo.tags && editedTodo.tags.length" class="selected-tags">
            <span v-for="tag in editedTodo.tags" :key="tag" class="tag-pill">
              {{ tag }}
              <button @click="removeTag(tag)" class="remove-tag" aria-label="Remove tag">×</button>
            </span>
          </div>
        </div>
      </div>
      
      <div class="form-group">
        <label for="edit-due-date">Due Date</label>
        <input 
          id="edit-due-date" 
          type="date" 
          v-model="editedTodo.dueDate" 
          class="form-input"
        />
      </div>
      
      <div class="modal-actions">
        <button @click="closeModal" class="cancel-btn">Cancel</button>
        <button @click="saveTodo" class="save-btn" :disabled="!editedTodo.text.trim()">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useTodoStore } from '../stores/todoStore'

export default {
  name: 'TodoEditModal',
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    todo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editedTodo: {
        id: null,
        text: '',
        completed: false,
        priority: 'medium',
        category: '',
        tags: [],
        dueDate: ''
      },
      selectedTag: ''
    }
  },
  computed: {
    ...mapState(useTodoStore, ['categories', 'tags']),
    availableTags() {
      return this.tags.filter(tag => !this.editedTodo.tags || !this.editedTodo.tags.includes(tag))
    }
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        this.editedTodo = { 
          ...this.todo,
          tags: this.todo.tags ? [...this.todo.tags] : []
        }
        this.selectedTag = ''
      }
    }
  },
  methods: {
    saveTodo() {
      if (this.editedTodo.text.trim()) {
        this.$emit('save', { ...this.editedTodo })
        this.closeModal()
      }
    },
    closeModal() {
      this.$emit('close')
    },
    addTagToSelection() {
      if (this.selectedTag && (!this.editedTodo.tags || !this.editedTodo.tags.includes(this.selectedTag))) {
        if (!this.editedTodo.tags) {
          this.editedTodo.tags = []
        }
        this.editedTodo.tags.push(this.selectedTag)
        this.selectedTag = ''
      }
    },
    removeTag(tag) {
      this.editedTodo.tags = this.editedTodo.tags.filter(t => t !== tag)
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal-content {
  background-color: var(--modal-bg-color);
  padding: 24px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  max-height: 90vh;
  overflow-y: auto;
}

.modal-title {
  margin-top: 0;
  margin-bottom: 20px;
  color: var(--text-color);
  font-size: 1.5rem;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  color: var(--text-color);
}

.form-input,
.form-select {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background-color: var(--input-bg-color);
  color: var(--text-color);
  font-size: 1rem;
}

.tag-selection {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.selected-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
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

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

.cancel-btn,
.save-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.cancel-btn {
  background-color: var(--cancel-btn-bg);
  color: var(--cancel-btn-text);
}

.save-btn {
  background-color: var(--primary-color);
  color: white;
}

.cancel-btn:hover {
  background-color: var(--cancel-btn-hover-bg);
}
</style>
