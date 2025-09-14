const express = require('express');
const Lead = require('../model/leadSchema');

const router = express.Router();

// GET /api/leads - Get all leads
router.get('/', async (req, res) => {
  try {
    const leads = await Lead.find().sort({ updatedAt: -1 });
    
    // Format the response to match frontend expectations
    const formattedLeads = leads.map(lead => ({
      id: lead._id.toString(),
      name: lead.name,
      contact: lead.contact,
      altPhone: lead.altPhone,
      email: lead.email,
      altEmail: lead.altEmail,
      status: lead.status,
      qualification: lead.qualification,
      interest: lead.interest,
      jobInterest: lead.jobInterest,
      source: lead.source,
      assignedTo: lead.assignedTo,
      city: lead.city,
      state: lead.state,
      heardFrom: lead.heardFrom,
      passoutYear: lead.passoutYear,
      updatedAt: lead.updatedAt.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    }));

    res.status(200).json({
      success: true,
      data: formattedLeads,
      count: formattedLeads.length
    });
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching leads',
      error: error.message
    });
  }
});

// POST /api/leads - Create a new lead
router.post('/', async (req, res) => {
  try {
    const {
      name,
      contact,
      altPhone,
      email,
      altEmail,
      status = 'New',
      qualification,
      interest,
      jobInterest,
      source,
      assignedTo,
      city,
      state,
      heardFrom,
      passoutYear
    } = req.body;

    // Validate required fields
    if (!name || !contact || !email || !qualification || !interest || !source || !assignedTo) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, contact, email, qualification, interest, source, assignedTo'
      });
    }

    // Create new lead
    const newLead = new Lead({
      name,
      contact,
      altPhone,
      email,
      altEmail,
      status,
      qualification,
      interest,
      jobInterest,
      source,
      assignedTo,
      city,
      state,
      heardFrom,
      passoutYear
    });

    const savedLead = await newLead.save();

    // Format response
    const formattedLead = {
      id: savedLead._id.toString(),
      name: savedLead.name,
      contact: savedLead.contact,
      altPhone: savedLead.altPhone,
      email: savedLead.email,
      altEmail: savedLead.altEmail,
      status: savedLead.status,
      qualification: savedLead.qualification,
      interest: savedLead.interest,
      jobInterest: savedLead.jobInterest,
      source: savedLead.source,
      assignedTo: savedLead.assignedTo,
      city: savedLead.city,
      state: savedLead.state,
      heardFrom: savedLead.heardFrom,
      passoutYear: savedLead.passoutYear,
      updatedAt: savedLead.updatedAt.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    };

    res.status(201).json({
      success: true,
      message: 'Lead created successfully',
      data: formattedLead
    });
  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating lead',
      error: error.message
    });
  }
});

module.exports = router;
