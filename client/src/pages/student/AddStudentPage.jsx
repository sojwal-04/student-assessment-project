import React from 'react'
import { useForm } from 'react-hook-form'
import { instance } from '../../config/instance'
import { toast } from 'react-toastify'

const AddStudentPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()

    // Handle form submission with try-catch for error handling
    const onSubmit = async (studentData) => {
        try {
            const { success, message } = await instance.post('/students/add', studentData)

            if (success) {
                toast.success(message)
            } else {
                toast.error(message || 'Failed to add student')
            }
        } catch (error) {
            // If the API call fails (e.g., network error, server error), catch it here
            const errorMessage = error.response?.data?.message || 'Something went wrong. Please try again later.'
            toast.error(errorMessage)
        }
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-6 text-blue-600">Add New Student</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* First Name Field */}
                    <div>
                        <label className="block text-gray-700 font-medium">First Name</label>
                        <input
                            type="text"
                            {...register('first_name', { required: 'First name is required' })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.first_name && <span className="text-red-600 text-sm">{errors.first_name.message}</span>}
                    </div>

                    {/* Last Name Field */}
                    <div>
                        <label className="block text-gray-700 font-medium">Last Name</label>
                        <input
                            type="text"
                            {...register('last_name', { required: 'Last name is required' })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.last_name && <span className="text-red-600 text-sm">{errors.last_name.message}</span>}
                    </div>

                    {/* Email Field */}
                    <div>
                        <label className="block text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: 'Enter a valid email address'
                                }
                            })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && <span className="text-red-600 text-sm">{errors.email.message}</span>}
                    </div>

                    {/* Contact Number Field */}
                    <div>
                        <label className="block text-gray-700 font-medium">Contact Number</label>
                        <input
                            type="text"
                            {...register('contact_number', {
                                required: 'Contact number is required',
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: 'Contact number must be exactly 10 digits'
                                }
                            })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.contact_number && <span className="text-red-600 text-sm">{errors.contact_number.message}</span>}
                    </div>

                    {/* Date of Birth Field */}
                    <div>
                        <label className="block text-gray-700 font-medium">Date of Birth</label>
                        <input
                            type="date"
                            {...register('date_of_birth', { required: 'Date of birth is required' })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.date_of_birth && <span className="text-red-600 text-sm">{errors.date_of_birth.message}</span>}
                    </div>

                    {/* Address Field */}
                    <div>
                        <label className="block text-gray-700 font-medium">Address</label>
                        <textarea
                            {...register('address')}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Branch (Department) Dropdown */}
                    <div>
                        <label className="block text-gray-700 font-medium">Branch (Department)</label>
                        <select
                            {...register('branch')}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="Computer Science">Computer Science</option>
                            <option value="Mechanical Engineering">Mechanical Engineering</option>
                            <option value="Electrical Engineering">Electrical Engineering</option>
                            <option value="Civil Engineering">Civil Engineering</option>
                            <option value="Chemical Engineering">Chemical Engineering</option>
                            <option value="Biotechnology">Biotechnology</option>
                        </select>
                    </div>

                    {/* Year Dropdown */}
                    <div>
                        <label className="block text-gray-700 font-medium">Year</label>
                        <select
                            {...register('year')}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value={1}>1st Year</option>
                            <option value={2}>2nd Year</option>
                            <option value={3}>3rd Year</option>
                            <option value={4}>4th Year</option>
                        </select>
                    </div>

                    {/* Status Field */}
                    <div>
                        <label className="block text-gray-700 font-medium">Status</label>
                        <select
                            {...register('status')}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="Active">Active</option>
                            <option value="Graduated">Graduated</option>
                            <option value="Dropped">Dropped</option>
                            <option value="Suspended">Suspended</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                        >
                            Add Student
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddStudentPage
