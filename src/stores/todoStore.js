import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [
      { id: 1, text: 'Learn Vue', completed: false, priority: 'high', dueDate: '2025-07-05' },
      { id: 2, text: 'Build a project', completed: false, priority: 'medium', dueDate: '2025-07-10' },
      { id: 3, text: 'Master Vue', completed: false, priority: 'low', dueDate: '2025-07-15' }
    ],
    filter: 'all',
    sortBy: 'priority',
    theme: 'light'
  }),
  
  getters: {
    // Filter todos based on the current filter
    filteredTodos: (state) => {
      if (state.filter === 'all') return state.todos
      if (state.filter === 'active') return state.todos.filter(todo => !todo.completed)
      if (state.filter === 'completed') return state.todos.filter(todo => todo.completed)
      return state.todos
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
          }
          return 0
        })
      }
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
    addTodo(text, priority, dueDate) {
      const newTodo = {
        id: Date.now(),
        text,
        completed: false,
        priority: priority || 'medium',
        dueDate: dueDate || ''
      }
      this.todos.push(newTodo)
      this.saveTodos()
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
    },
    
    // Save theme preference
    saveTheme() {
      localStorage.setItem('theme', this.theme)
    }
  }
})
