/**
 * Controller for resource management (documents, links, downloads).
 * Handles CRUD operations for church resources like documents, links, and files.
 * Provides functionality for both public viewing and admin management.
 */

import Resource from '../models/Resource.js';
import fs from 'fs';
import path from 'path';

/**
 * Get all resources, sorted by creation date
 * @route GET /api/resources
 * @access Public
 * @returns {Array} List of all resources
 */
export const getResources = async (req, res) => {
  try {
    // Fetch all resources, sorted by newest first
    const resources = await Resource.find().sort({ createdAt: -1 });
    
    // Add resource count statistics
    const stats = {
      total: resources.length,
      files: resources.filter(r => r.type === 'file').length,
      links: resources.filter(r => r.type === 'link').length
    };

    res.json({
      resources,
      stats
    });
  } catch (error) {
    console.error('Error fetching resources:', error);
    res.status(500).json({ 
      error: 'Could not fetch resources',
      message: error.message 
    });
  }
};

/**
 * Create a new resource
 * @route POST /api/resources
 * @access Private (Admin only)
 * @param {Object} req.body - Resource data (title, description, type, link)
 * @param {File} req.file - Optional uploaded file
 * @returns {Object} Created resource
 */
export const createResource = async (req, res) => {
  try {
    const { title, description, type, link } = req.body;

    // Validate required fields
    if (!title || !type) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Title and type are required'
      });
    }

    // Validate resource type
    if (!['file', 'link'].includes(type)) {
      return res.status(400).json({
        error: 'Invalid resource type',
        message: 'Type must be either "file" or "link"'
      });
    }

    // Determine the final link/file path
    let finalLink;
    if (type === 'file') {
      if (!req.file) {
        return res.status(400).json({
          error: 'File required',
          message: 'Please upload a file for file-type resources'
        });
      }
      finalLink = `/uploads/${req.file.filename}`;
    } else {
      if (!link) {
        return res.status(400).json({
          error: 'Link required',
          message: 'Please provide a link for link-type resources'
        });
      }
      // Validate URL format for links
      try {
        new URL(link);
        finalLink = link;
      } catch (urlError) {
        return res.status(400).json({
          error: 'Invalid URL',
          message: 'Please provide a valid URL'
        });
      }
    }

    // Create new resource
    const resource = new Resource({
      title: title.trim(),
      description: description ? description.trim() : '',
      link: finalLink,
      type,
      createdAt: new Date()
    });

    await resource.save();

    res.status(201).json({
      message: 'Resource created successfully',
      resource
    });

  } catch (error) {
    console.error('Error creating resource:', error);
    
    // Clean up uploaded file if resource creation failed
    if (req.file && req.file.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (cleanupError) {
        console.error('File cleanup error:', cleanupError);
      }
    }

    res.status(500).json({ 
      error: 'Failed to create resource',
      message: error.message 
    });
  }
};

/**
 * Update an existing resource
 * @route PUT /api/resources/:id
 * @access Private (Admin only)
 * @param {string} req.params.id - Resource ID
 * @param {Object} req.body - Updated resource data
 * @param {File} req.file - Optional new uploaded file
 * @returns {Object} Updated resource
 */
export const updateResource = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, type, link } = req.body;

    // Find existing resource
    const existingResource = await Resource.findById(id);
    if (!existingResource) {
      return res.status(404).json({
        error: 'Resource not found',
        message: 'The specified resource does not exist'
      });
    }

    // Validate required fields
    if (!title || !type) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Title and type are required'
      });
    }

    // Validate resource type
    if (!['file', 'link'].includes(type)) {
      return res.status(400).json({
        error: 'Invalid resource type',
        message: 'Type must be either "file" or "link"'
      });
    }

    // Handle file/link updates
    let finalLink = existingResource.link; // Keep existing by default
    let oldFilePath = null;

    if (type === 'file') {
      if (req.file) {
        // New file uploaded - update link and mark old file for deletion
        if (existingResource.type === 'file' && existingResource.link.startsWith('/uploads/')) {
          oldFilePath = path.join(process.cwd(), existingResource.link);
        }
        finalLink = `/uploads/${req.file.filename}`;
      } else if (existingResource.type !== 'file') {
        // Changing from link to file but no file provided
        return res.status(400).json({
          error: 'File required',
          message: 'Please upload a file when changing to file type'
        });
      }
    } else {
      // Type is 'link'
      if (!link) {
        return res.status(400).json({
          error: 'Link required',
          message: 'Please provide a link for link-type resources'
        });
      }
      
      // Validate URL format
      try {
        new URL(link);
        finalLink = link;
        
        // If changing from file to link, mark old file for deletion
        if (existingResource.type === 'file' && existingResource.link.startsWith('/uploads/')) {
          oldFilePath = path.join(process.cwd(), existingResource.link);
        }
      } catch (urlError) {
        return res.status(400).json({
          error: 'Invalid URL',
          message: 'Please provide a valid URL'
        });
      }
    }

    // Update resource
    const updatedResource = await Resource.findByIdAndUpdate(
      id,
      {
        title: title.trim(),
        description: description ? description.trim() : '',
        link: finalLink,
        type,
        updatedAt: new Date()
      },
      { new: true }
    );

    // Delete old file if it exists and was replaced
    if (oldFilePath && fs.existsSync(oldFilePath)) {
      try {
        fs.unlinkSync(oldFilePath);
      } catch (deleteError) {
        console.error('Error deleting old file:', deleteError);
      }
    }

    res.json({
      message: 'Resource updated successfully',
      resource: updatedResource
    });

  } catch (error) {
    console.error('Error updating resource:', error);
    
    // Clean up new uploaded file if update failed
    if (req.file && req.file.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (cleanupError) {
        console.error('File cleanup error:', cleanupError);
      }
    }

    res.status(500).json({ 
      error: 'Failed to update resource',
      message: error.message 
    });
  }
};

/**
 * Delete a resource
 * @route DELETE /api/resources/:id
 * @access Private (Admin only)
 * @param {string} req.params.id - Resource ID
 * @returns {Object} Deletion confirmation
 */
export const deleteResource = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete resource
    const resource = await Resource.findByIdAndDelete(id);
    
    if (!resource) {
      return res.status(404).json({
        error: 'Resource not found',
        message: 'The specified resource does not exist'
      });
    }

    // Delete associated file if it exists
    if (resource.type === 'file' && resource.link.startsWith('/uploads/')) {
      const filePath = path.join(process.cwd(), resource.link);
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (deleteError) {
          console.error('Error deleting file:', deleteError);
        }
      }
    }

    res.json({
      message: 'Resource deleted successfully',
      deletedResource: {
        id: resource._id,
        title: resource.title,
        type: resource.type
      }
    });

  } catch (error) {
    console.error('Error deleting resource:', error);
    res.status(500).json({ 
      error: 'Failed to delete resource',
      message: error.message 
    });
  }
};
