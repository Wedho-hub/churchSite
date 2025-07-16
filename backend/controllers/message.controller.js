/**
 * Controller for message management (contact form, admin message viewing).
 * Handles sending messages from contact form, retrieving messages for admin,
 * and marking messages as read.
 */

import Message from '../models/Message.js';

/**
 * Send a message from the contact form
 * @route POST /api/messages
 * @access Public
 * @param {Object} req.body - Contains name, email, message
 * @returns {Object} Success message or error
 */
export const sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        message: "Please provide name, email, and message" 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: "Please provide a valid email address" 
      });
    }

    // Create new message
    const newMessage = new Message({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      read: false,
      createdAt: new Date()
    });

    await newMessage.save();

    res.status(201).json({ 
      message: "Thank you for your message! We'll get back to you soon.",
      success: true 
    });

  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ 
      message: "Failed to send message. Please try again later.",
      error: error.message 
    });
  }
};

/**
 * Get all messages for admin viewing
 * @route GET /api/messages
 * @access Private (Admin only)
 * @returns {Array} List of all messages, sorted by newest first
 */
export const getMessages = async (req, res) => {
  try {
    // Fetch all messages, sorted by creation date (newest first)
    const messages = await Message.find()
      .sort({ createdAt: -1 })
      .select('name email message read createdAt');

    // Add message count statistics
    const totalMessages = messages.length;
    const unreadMessages = messages.filter(msg => !msg.read).length;

    res.json({
      messages,
      stats: {
        total: totalMessages,
        unread: unreadMessages,
        read: totalMessages - unreadMessages
      }
    });

  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ 
      message: "Failed to fetch messages",
      error: error.message 
    });
  }
};

/**
 * Mark a message as read
 * @route PUT /api/messages/:id/read
 * @access Private (Admin only)
 * @param {string} req.params.id - Message ID
 * @returns {Object} Updated message or error
 */
export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and update the message
    const message = await Message.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ 
        message: "Message not found" 
      });
    }

    res.json({ 
      message: "Message marked as read",
      data: message 
    });

  } catch (error) {
    console.error('Error marking message as read:', error);
    res.status(500).json({ 
      message: "Failed to mark message as read",
      error: error.message 
    });
  }
};

/**
 * Delete a message
 * @route DELETE /api/messages/:id
 * @access Private (Admin only)
 * @param {string} req.params.id - Message ID
 * @returns {Object} Success message or error
 */
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await Message.findByIdAndDelete(id);

    if (!message) {
      return res.status(404).json({ 
        message: "Message not found" 
      });
    }

    res.json({ 
      message: "Message deleted successfully" 
    });

  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ 
      message: "Failed to delete message",
      error: error.message 
    });
  }
};
