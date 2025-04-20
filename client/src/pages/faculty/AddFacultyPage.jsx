import React, { useState } from 'react';
import { instance } from '../../config/instance';
import { useNavigate } from 'react-router-dom';

const AddFacultyPage = () => {
    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        contact_number: '',
        department: '',
        qualifications: '',
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const payload = {
                ...form,
                password: form.password || '1234', // default password
            };

            const { success, data } = await instance.post('/faculty', payload);

            if (success) {
                setTimeout(() => {
                    navigate('/faculty/list');
                }, 1500)
            } else {
                setError(data.message || 'Failed to add faculty.');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-12 bg-white p-10 rounded-2xl shadow-lg border">
            <h2 className="text-4xl font-semibold text-center text-sky-700 mb-8">
                Add Faculty
            </h2>

            {error && <p className="text-red-600 text-center mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    { label: 'First Name', name: 'first_name', required: true },
                    { label: 'Last Name', name: 'last_name', required: true },
                    { label: 'Email', name: 'email', type: 'email', required: true },
                    { label: 'Password (optional)', name: 'password', type: 'password' },
                    { label: 'Contact Number', name: 'contact_number', placeholder: '10-digit phone number' },
                    { label: 'Department', name: 'department' },
                    { label: 'Qualifications', name: 'qualifications', type: 'textarea' },
                ].map((field) => (
                    <div
                        key={field.name}
                        className={field.name === 'qualifications' ? 'md:col-span-2' : ''}
                    >
                        <label className="block text-gray-700 font-medium mb-1">
                            {field.label}
                        </label>

                        {field.type === 'textarea' ? (
                            <textarea
                                name={field.name}
                                value={form[field.name]}
                                onChange={handleChange}
                                placeholder={field.placeholder}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                                rows={4}
                            />
                        ) : (
                            <input
                                type={field.type || 'text'}
                                name={field.name}
                                value={form[field.name]}
                                onChange={handleChange}
                                required={field.required}
                                placeholder={field.placeholder}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
                            />
                        )}
                    </div>
                ))}

                <div className="md:col-span-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-semibold transition"
                    >
                        {loading ? 'Adding Faculty...' : 'Add Faculty'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddFacultyPage;
