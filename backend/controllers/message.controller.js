/**
 * Stub controller for message management.
 * Returns 501 Not Implemented for all functions.
 */

export const sendMessage = (req, res) => {
  res.status(501).json({ message: "sendMessage endpoint not implemented yet." });
};

export const getMessages = (req, res) => {
  res.status(501).json({ message: "getMessages endpoint not implemented yet." });
};

export const markAsRead = (req, res) => {
  res.status(501).json({ message: "markAsRead endpoint not implemented yet." });
};
