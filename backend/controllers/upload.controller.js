/**
 * Controller for file upload management.
 * Handles image uploads for gallery, blog posts, and other content.
 * Provides secure file upload with validation and error handling.
 */

import path from 'path';
import fs from 'fs';

/**
 * Upload a single image file
 * @route POST /api/upload
 * @access Private (Admin only)
 * @param {File} req.file - Uploaded image file (handled by multer middleware)
 * @returns {Object} Upload success response with file URL
 */
export const uploadImage = (req, res) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ 
        message: "No image file provided",
        error: "Please select an image to upload" 
      });
    }

    // Validate file type (additional check beyond multer filter)
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(req.file.mimetype)) {
      // Remove uploaded file if invalid type
      fs.unlinkSync(req.file.path);
      return res.status(400).json({
        message: "Invalid file type",
        error: "Only JPEG, PNG, GIF, and WebP images are allowed"
      });
    }

    // Validate file size (additional check beyond multer limits)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (req.file.size > maxSize) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({
        message: "File too large",
        error: "Image must be smaller than 5MB"
      });
    }

    // Generate file URL for frontend use
    const fileUrl = `/uploads/${req.file.filename}`;
    
    // Get file information
    const fileInfo = {
      originalName: req.file.originalname,
      filename: req.file.filename,
      size: req.file.size,
      mimetype: req.file.mimetype,
      url: fileUrl,
      uploadedAt: new Date().toISOString()
    };

    res.status(200).json({ 
      message: "Image uploaded successfully",
      success: true,
      fileUrl: fileUrl,
      fileInfo: fileInfo
    });

  } catch (error) {
    console.error('Upload error:', error);
    
    // Clean up file if it exists
    if (req.file && req.file.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (cleanupError) {
        console.error('File cleanup error:', cleanupError);
      }
    }

    res.status(500).json({
      message: "Upload failed",
      error: error.message
    });
  }
};

/**
 * Upload multiple images at once
 * @route POST /api/upload/multiple
 * @access Private (Admin only)
 * @param {File[]} req.files - Array of uploaded image files
 * @returns {Object} Upload success response with file URLs array
 */
export const uploadMultipleImages = (req, res) => {
  try {
    // Check if files were uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ 
        message: "No image files provided",
        error: "Please select images to upload" 
      });
    }

    const uploadedFiles = [];
    const errors = [];

    // Process each uploaded file
    req.files.forEach((file, index) => {
      try {
        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.mimetype)) {
          fs.unlinkSync(file.path);
          errors.push(`File ${index + 1}: Invalid file type`);
          return;
        }

        // Validate file size
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
          fs.unlinkSync(file.path);
          errors.push(`File ${index + 1}: File too large (max 5MB)`);
          return;
        }

        // Add to successful uploads
        uploadedFiles.push({
          originalName: file.originalname,
          filename: file.filename,
          size: file.size,
          mimetype: file.mimetype,
          url: `/uploads/${file.filename}`,
          uploadedAt: new Date().toISOString()
        });

      } catch (fileError) {
        console.error(`Error processing file ${index + 1}:`, fileError);
        errors.push(`File ${index + 1}: Processing failed`);
      }
    });

    // Return results
    const response = {
      message: `${uploadedFiles.length} images uploaded successfully`,
      success: true,
      uploadedFiles: uploadedFiles,
      fileUrls: uploadedFiles.map(file => file.url)
    };

    if (errors.length > 0) {
      response.warnings = errors;
      response.message += ` (${errors.length} files had errors)`;
    }

    res.status(200).json(response);

  } catch (error) {
    console.error('Multiple upload error:', error);

    // Clean up any uploaded files on error
    if (req.files) {
      req.files.forEach(file => {
        try {
          if (file.path) fs.unlinkSync(file.path);
        } catch (cleanupError) {
          console.error('File cleanup error:', cleanupError);
        }
      });
    }

    res.status(500).json({
      message: "Multiple upload failed",
      error: error.message
    });
  }
};

/**
 * Delete an uploaded file
 * @route DELETE /api/upload/:filename
 * @access Private (Admin only)
 * @param {string} req.params.filename - Name of file to delete
 * @returns {Object} Deletion success response
 */
export const deleteUploadedFile = (req, res) => {
  try {
    const { filename } = req.params;

    if (!filename) {
      return res.status(400).json({
        message: "Filename is required",
        error: "Please provide a filename to delete"
      });
    }

    // Construct file path
    const filePath = path.join(process.cwd(), 'uploads', filename);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        message: "File not found",
        error: "The specified file does not exist"
      });
    }

    // Delete the file
    fs.unlinkSync(filePath);

    res.json({
      message: "File deleted successfully",
      success: true,
      deletedFile: filename
    });

  } catch (error) {
    console.error('File deletion error:', error);
    res.status(500).json({
      message: "Failed to delete file",
      error: error.message
    });
  }
};
