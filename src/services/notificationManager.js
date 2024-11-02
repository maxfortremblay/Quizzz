class NotificationManager {
  static show(message, type = "info") {
    // Ensure the notification container exists
    let container = document.querySelector(".notification-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "notification-container";
      document.body.appendChild(container);
    }

    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;
    container.appendChild(notification);

    setTimeout(() => {
      notification.classList.add("visible");
      setTimeout(() => {
        notification.classList.remove("visible");
        setTimeout(() => notification.remove(), 300);
      }, 3000);
    }, 100);
  }
}

export default NotificationManager;
