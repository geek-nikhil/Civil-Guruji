const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  contact: {
    type: String,
    required: true,
    trim: true
  },
  altPhone: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  altEmail: {
    type: String,
    trim: true,
    lowercase: true
  },
  status: {
    type: String,
    enum: ['New', 'Follow-Up', 'Qualified', 'Converted'],
    default: 'New'
  },
  qualification: {
    type: String,
    enum: ['High School', 'Bachelors', 'Masters', 'PhD', 'Other'],
    required: true
  },
  interest: {
    type: String,
    required: true,
    trim: true
  },
  jobInterest: {
    type: String,
    trim: true
  },
  source: {
    type: String,
    enum: ['Email Campaign', 'Website', 'Cold Call', 'Social Media'],
    required: true
  },
  assignedTo: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    trim: true
  },
  state: {
    type: String,
    trim: true
  },
  heardFrom: {
    type: String,
    trim: true
  },
  passoutYear: {
    type: String,
    trim: true
  }
}, {
  timestamps: true // This adds createdAt and updatedAt automatically
});

// Create and export the model
const Lead = mongoose.model('Lead', leadSchema);

module.exports = Lead;