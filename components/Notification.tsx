import React from 'react';

interface NotificationProps {
  message: string;
  type: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  return (
    <div className={`notification ${type}`}>
      {message}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Notification;
