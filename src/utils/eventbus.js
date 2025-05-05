const listeners = {};

export const eventBus = {
  on(event, callback) {
    (listeners[event] ||= []).push(callback);
  },

  off(event, callback) {
    listeners[event] = (listeners[event] || []).filter((cb) => cb !== callback);
  },

  emit(event, data) {
    (listeners[event] || []).forEach((callback) => callback(data));
  },
};
