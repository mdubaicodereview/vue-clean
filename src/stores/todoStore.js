import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [
      { id: 1, text: 'Learn Vue', completed: false, priority: 'high', dueDate: '2025-07-05', category: 'Work', tags: ['learning'] },
      { id: 2, text: 'Build a project', completed: false, priority: 'medium', dueDate: '2025-07-10', category: 'Personal', tags: ['coding'] },
      { id: 3, text: 'Master Vue', completed: false, priority: 'low', dueDate: '2025-07-15', category: 'Work', tags: ['learning', 'important'] }
    ],
    filter: 'all',
    categoryFilter: 'all',
    tagFilter: 'all',
    sortBy: 'priority',
    theme: 'light',
    categories: ['Work', 'Personal', 'Shopping', 'Health'],
    tags: ['urgent', 'important', 'learning', 'coding', 'delegated']
  }),
  
  getters: {
    // Filter todos based on all active filters
    filteredTodos: (state) => {
      let filtered = state.todos;
      
      // Filter by completion status
      if (state.filter === 'active') {
        filtered = filtered.filter(todo => !todo.completed);
      } else if (state.filter === 'completed') {
        filtered = filtered.filter(todo => todo.completed);
      }
      
      // Filter by category
      if (state.categoryFilter !== 'all') {
        filtered = filtered.filter(todo => todo.category === state.categoryFilter);
      }
      
      // Filter by tag
      if (state.tagFilter !== 'all') {
        filtered = filtered.filter(todo => todo.tags && todo.tags.includes(state.tagFilter));
      }
      
      return filtered;
    },
    
    // Sort todos based on the current sort option
    sortedTodos: (state) => {
      return (todos) => {
        return [...todos].sort((a, b) => {
          if (state.sortBy === 'priority') {
            const priorityValues = { high: 3, medium: 2, low: 1 }
            return priorityValues[b.priority] - priorityValues[a.priority]
          } else if (state.sortBy === 'dueDate') {
            return new Date(a.dueDate) - new Date(b.dueDate)
          } else if (state.sortBy === 'category') {
            return (a.category || '').localeCompare(b.category || '')
          }
          return 0
        })
      }
    },
    
    // Get available categories
    availableCategories: (state) => {
      return state.categories
    },
    
    // Get available tags
    availableTags: (state) => {
      return state.tags
    },
    
    // Get filtered and sorted todos
    processedTodos: (state) => {
      return state.sortedTodos(state.filteredTodos)
    },
    
    // Calculate statistics
    totalTodos: (state) => state.todos.length,
    completedTodos: (state) => state.todos.filter(todo => todo.completed).length,
    pendingTodos: (state) => state.todos.filter(todo => !todo.completed).length,
    
    completionRate: (state) => {
      const total = state.todos.length
      const completed = state.todos.filter(todo => todo.completed).length
      return total > 0 ? Math.round((completed / total) * 100) : 0
    },
    
    highPriorityTasks: (state) => state.todos.filter(t => t.priority === 'high').length,
    
    tasksDueToday: (state) => {
      const today = new Date().toISOString().split('T')[0]
      return state.todos.filter(t => t.dueDate === today).length
    },
    
    overdueTasks: (state) => {
      const today = new Date().toISOString().split('T')[0]
      return state.todos.filter(t => 
        !t.completed && 
        t.dueDate && 
        new Date(t.dueDate) < new Date() && 
        t.dueDate !== today
      ).length
    }
  },
  
  actions: {
    // Add a new todo
    addTodo(todoData) {
      const { text, priority, dueDate, category, tags } = todoData;
      const newTodo = {
        id: Date.now(),
        text,
        completed: false,
        priority: priority || 'medium',
        dueDate: dueDate || '',
        category: category || '',
        tags: tags || []
      }
      this.todos.push(newTodo)
      this.saveTodos()
    },
    
    // Add a new category
    addCategory(category) {
      if (category && !this.categories.includes(category)) {
        this.categories.push(category);
        this.saveTodos();
      }
    },
    
    // Add a new tag
    addTag(tag) {
      if (tag && !this.tags.includes(tag)) {
        this.tags.push(tag);
        this.saveTodos();
      }
    },
    
    // Delete a todo
    deleteTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id)
      this.saveTodos()
    },
    
    // Update a todo
    updateTodo(id, updates) {
      const index = this.todos.findIndex(todo => todo.id === id)
      if (index !== -1) {
        this.todos[index] = { ...this.todos[index], ...updates }
        this.saveTodos()
      }
    },
    
    // Toggle todo completion status
    toggleTodo(id) {
      const todo = this.todos.find(todo => todo.id === id)
      if (todo) {
        todo.completed = !todo.completed
        this.saveTodos()
      }
    },
    
    // Set the current filter
    setFilter(filter) {
      this.filter = filter
    },
    
    // Set the category filter
    setCategoryFilter(category) {
      this.categoryFilter = category
    },
    
    // Set the tag filter
    setTagFilter(tag) {
      this.tagFilter = tag
    },
    
    // Set the current sort option
    setSortBy(sortBy) {
      this.sortBy = sortBy
    },
    
    // Toggle theme between light and dark
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      document.documentElement.setAttribute('data-theme', this.theme)
    },
    
    // Load todos from localStorage
    loadTodos() {
      const savedTodos = localStorage.getItem('todos')
      if (savedTodos) {
        this.todos = JSON.parse(savedTodos)
      }
      
      // Load categories and tags
      const savedCategories = localStorage.getItem('categories')
      if (savedCategories) {
        this.categories = JSON.parse(savedCategories)
      }
      
      const savedTags = localStorage.getItem('tags')
      if (savedTags) {
        this.tags = JSON.parse(savedTags)
      }
      
      // Load theme preference
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme) {
        this.theme = savedTheme
        document.documentElement.setAttribute('data-theme', this.theme)
      }
    },
    
    // Save todos to localStorage
    saveTodos() {
      localStorage.setItem('todos', JSON.stringify(this.todos))
      localStorage.setItem('categories', JSON.stringify(this.categories))
      localStorage.setItem('tags', JSON.stringify(this.tags))
    },
    
    // Save theme preference
    saveTheme() {
      localStorage.setItem('theme', this.theme)
    }
  }
})
