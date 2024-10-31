class NotificationManager {
  static show(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.querySelector('.notification-container').appendChild(notification);

    setTimeout(() => {
      notification.classList.add('visible');
      setTimeout(() => {
        notification.classList.remove('visible');
        setTimeout(() => notification.remove(), 300);
      }, 3000);
    }, 100);
  }
}