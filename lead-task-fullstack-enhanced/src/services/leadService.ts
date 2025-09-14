import axios from 'axios';
import { Lead, CreateLeadRequest } from '../types/lead';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://civil-guruji-q1xx.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const leadService = {
  // Get all leads
  getLeads: async (): Promise<Lead[]> => {
    try {
      const response = await api.get('/leads');
      return response.data.data; // Backend returns {success: true, data: [...], count: number}
    } catch (error) {
      console.error('Error fetching leads:', error);
      throw error;
    }
  },

  // Create a new lead
  createLead: async (leadData: CreateLeadRequest): Promise<Lead> => {
    try {
      const response = await api.post('/leads', leadData);
      return response.data.data; // Backend returns {success: true, message: string, data: {...}}
    } catch (error) {
      console.error('Error creating lead:', error);
      throw error;
    }
  },

  // Update a lead
  updateLead: async (id: string, leadData: Partial<CreateLeadRequest>): Promise<Lead> => {
    try {
      const response = await api.put(`/leads/${id}`, leadData);
      return response.data;
    } catch (error) {
      console.error('Error updating lead:', error);
      throw error;
    }
  },

  // Delete a lead
  deleteLead: async (id: string): Promise<void> => {
    try {
      await api.delete(`/leads/${id}`);
    } catch (error) {
      console.error('Error deleting lead:', error);
      throw error;
    }
  },

  // Get a single lead by ID
  getLeadById: async (id: string): Promise<Lead> => {
    try {
      const response = await api.get(`/leads/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching lead:', error);
      throw error;
    }
  }
};

export default leadService;
