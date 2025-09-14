import React, { useState } from 'react';
import { CreateLeadRequest } from '../types/lead';

interface AddLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (leadData: CreateLeadRequest) => Promise<void>;
}

const AddLeadModal: React.FC<AddLeadModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<CreateLeadRequest>({
    name: '',
    contact: '',
    altPhone: '',
    email: '',
    altEmail: '',
    status: 'New',
    qualification: 'High School',
    interest: 'Web Development',
    jobInterest: '',
    source: 'Website',
    assignedTo: 'John Doe',
    city: '',
    state: '',
    heardFrom: '',
    passoutYear: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<CreateLeadRequest>>({});

  const handleInputChange = (field: keyof CreateLeadRequest, value: string) => {
    // Format phone numbers as user types
    if (field === 'contact' || field === 'altPhone') {
      // Remove all non-digit characters except +
      const cleaned = value.replace(/[^\d+]/g, '');
      // Add formatting for better UX
      let formatted = cleaned;
      if (cleaned.length > 3 && cleaned.length <= 6) {
        formatted = cleaned.slice(0, 3) + '-' + cleaned.slice(3);
      } else if (cleaned.length > 6) {
        formatted = cleaned.slice(0, 3) + '-' + cleaned.slice(3, 6) + '-' + cleaned.slice(6, 10);
      }
      setFormData(prev => ({ ...prev, [field]: formatted }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<CreateLeadRequest> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (formData.name.trim().length > 50) {
      newErrors.name = 'Name must be less than 50 characters';
    }

    // Phone validation
    if (!formData.contact.trim()) {
      newErrors.contact = 'Phone number is required';
    } else {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      const cleanPhone = formData.contact.replace(/[\s\-\(\)]/g, '');
      if (!phoneRegex.test(cleanPhone) || cleanPhone.length < 10) {
        newErrors.contact = 'Please enter a valid phone number (minimum 10 digits)';
      }
    }

    // Alt Phone validation (if provided)
    if (formData.altPhone && formData.altPhone.trim()) {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      const cleanPhone = formData.altPhone.replace(/[\s\-\(\)]/g, '');
      if (!phoneRegex.test(cleanPhone) || cleanPhone.length < 10) {
        newErrors.altPhone = 'Please enter a valid alternative phone number';
      }
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      } else if (formData.email.length > 100) {
        newErrors.email = 'Email must be less than 100 characters';
      }
    }

    // Alt Email validation (if provided)
    if (formData.altEmail && formData.altEmail.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.altEmail)) {
        newErrors.altEmail = 'Please enter a valid alternative email address';
      }
    }

    // Interest validation
    if (!formData.interest.trim()) {
      newErrors.interest = 'Interest is required';
    }

    // Assigned To validation
    if (!formData.assignedTo.trim()) {
      newErrors.assignedTo = 'Assigned To is required';
    }

    // Passout Year validation (if provided)
    if (formData.passoutYear && formData.passoutYear.trim()) {
      const currentYear = new Date().getFullYear();
      const passoutYear = parseInt(formData.passoutYear);
      if (isNaN(passoutYear) || passoutYear < 1950 || passoutYear > currentYear + 5) {
        newErrors.passoutYear = `Please enter a valid year (1950 - ${currentYear + 5})`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      // Reset form on success
      setFormData({
        name: '',
        contact: '',
        altPhone: '',
        email: '',
        altEmail: '',
        status: 'New',
        qualification: 'High School',
        interest: 'Web Development',
        jobInterest: '',
        source: 'Website',
        assignedTo: 'John Doe',
        city: '',
        state: '',
        heardFrom: '',
        passoutYear: ''
      });
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Add Lead</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter name"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Alt. Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alt. Phone</label>
                <input
                  type="text"
                  value={formData.altPhone}
                  onChange={(e) => handleInputChange('altPhone', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.altPhone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter alternative phone"
                />
                {errors.altPhone && <p className="text-red-500 text-xs mt-1">{errors.altPhone}</p>}
              </div>

              {/* Alt. Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alt. Email</label>
                <input
                  type="email"
                  value={formData.altEmail}
                  onChange={(e) => handleInputChange('altEmail', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.altEmail ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter alternative email"
                />
                {errors.altEmail && <p className="text-red-500 text-xs mt-1">{errors.altEmail}</p>}
              </div>

              {/* Qualification */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
                <select
                  value={formData.qualification}
                  onChange={(e) => handleInputChange('qualification', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="High School">High School</option>
                  <option value="Bachelors">Bachelors</option>
                  <option value="Masters">Masters</option>
                  <option value="PhD">PhD</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Source */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                <select
                  value={formData.source}
                  onChange={(e) => handleInputChange('source', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Website">Website</option>
                  <option value="Email Campaign">Email Campaign</option>
                  <option value="Cold Call">Cold Call</option>
                  <option value="Social Media">Social Media</option>
                </select>
              </div>

              {/* Job Interest */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Interest</label>
                <select
                  value={formData.jobInterest}
                  onChange={(e) => handleInputChange('jobInterest', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select job interest</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile Development">Mobile Development</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                </select>
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter city"
                />
              </div>

              {/* Heard From */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Heard From</label>
                <input
                  type="text"
                  value={formData.heardFrom}
                  onChange={(e) => handleInputChange('heardFrom', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="How did you hear about us?"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="text"
                  value={formData.contact}
                  onChange={(e) => handleInputChange('contact', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.contact ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter phone number"
                />
                {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter email address"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="New">New</option>
                  <option value="Follow-Up">Follow-Up</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Converted">Converted</option>
                </select>
              </div>

              {/* Interest */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Interest</label>
                <select
                  value={formData.interest}
                  onChange={(e) => handleInputChange('interest', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.interest ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile Development">Mobile Development</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                </select>
                {errors.interest && <p className="text-red-500 text-xs mt-1">{errors.interest}</p>}
              </div>

              {/* Assigned To */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                <select
                  value={formData.assignedTo}
                  onChange={(e) => handleInputChange('assignedTo', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.assignedTo ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="John Doe">John Doe</option>
                  <option value="Jane Smith">Jane Smith</option>
                  <option value="Emily Davis">Emily Davis</option>
                  <option value="Robert Johnson">Robert Johnson</option>
                </select>
                {errors.assignedTo && <p className="text-red-500 text-xs mt-1">{errors.assignedTo}</p>}
              </div>

              {/* State */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter state"
                />
              </div>

              {/* Passout Year */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Passout Year</label>
                <input
                  type="text"
                  value={formData.passoutYear}
                  onChange={(e) => handleInputChange('passoutYear', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.passoutYear ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter passout year"
                />
                {errors.passoutYear && <p className="text-red-500 text-xs mt-1">{errors.passoutYear}</p>}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Adding...' : 'Add Lead'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLeadModal;
