<template>
  <button 
    @click="toggleTheme" 
    class="theme-toggle"
    :aria-label="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <span class="theme-icon">{{ isDarkMode ? '☀️' : '🌙' }}</span>
    <span class="theme-text">{{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}</span>
  </button>
</template>

<script>
export default {
  name: 'ThemeToggle',
  props: {
    isDarkMode: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    toggleTheme() {
      this.$emit('toggle-theme')
    }
  }
}
</script>

<style scoped>
.theme-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  background-color: var(--theme-toggle-bg);
  color: var(--theme-toggle-text);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.theme-toggle:hover {
  background-color: var(--theme-toggle-hover-bg);
}

.theme-icon {
  font-size: 1.1rem;
}

@media (max-width: 600px) {
  .theme-text {
    display: none;
  }
  
  .theme-toggle {
    padding: 8px;
    border-radius: 50%;
  }
}
</style>
