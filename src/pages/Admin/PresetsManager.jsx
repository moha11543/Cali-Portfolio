import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit2, Trash2, X, Check } from 'lucide-react';

const PresetsManager = () => {
    const [presets, setPresets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price_num: '',
        cover_image_url: '',
        video_sample_url: '',
        is_active: true
    });

    // New state for file uploads
    const [coverFile, setCoverFile] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const [coverPreview, setCoverPreview] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchPresets();
    }, []);

    const fetchPresets = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('presets')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error('Error fetching presets:', error);
        else setPresets(data || []);
        setLoading(false);
    };

    const handleOpenModal = (preset = null) => {
        if (preset) {
            setEditingId(preset.id);
            setFormData({
                title: preset.title,
                description: preset.description || '',
                price_num: preset.price_num,
                cover_image_url: preset.cover_image_url || '',
                video_sample_url: preset.video_sample_url || '',
                is_active: preset.is_active
            });
            setCoverPreview(preset.cover_image_url || null);
            setVideoPreview(preset.video_sample_url || null);
        } else {
            setEditingId(null);
            setFormData({
                title: '',
                description: '',
                price_num: '',
                cover_image_url: '',
                video_sample_url: '',
                is_active: true
            });
            setCoverPreview(null);
            setVideoPreview(null);
        }
        setCoverFile(null);
        setVideoFile(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
        setCoverFile(null);
        setVideoFile(null);
        if (coverPreview && !coverPreview.startsWith('http')) URL.revokeObjectURL(coverPreview);
        if (videoPreview && !videoPreview.startsWith('http')) URL.revokeObjectURL(videoPreview);
        setCoverPreview(null);
        setVideoPreview(null);
    };

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (!file) return;

        if (type === 'cover') {
            setCoverFile(file);
            setCoverPreview(URL.createObjectURL(file));
        } else if (type === 'video') {
            setVideoFile(file);
            setVideoPreview(URL.createObjectURL(file));
        }
    };

    const uploadFile = async (file) => {
        const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;

        console.log('Uploading file:', fileName, 'to bucket: presets');

        const { data, error } = await supabase.storage
            .from('presets')
            .upload(fileName, file, {
                cacheControl: '3600',
                upsert: false
            });

        if (error) {
            console.log('Upload error:', error);
            throw new Error(`Upload failed: ${error.message}`);
        }

        console.log('Upload success:', data);

        const { data: urlData } = supabase.storage.from('presets').getPublicUrl(fileName);
        console.log('Public URL:', urlData.publicUrl);
        return urlData.publicUrl;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        try {
            let finalCoverUrl = formData.cover_image_url;
            let finalVideoUrl = formData.video_sample_url;

            if (coverFile) {
                finalCoverUrl = await uploadFile(coverFile);
            }
            if (videoFile) {
                finalVideoUrl = await uploadFile(videoFile);
            }

            const payload = {
                title: formData.title,
                description: formData.description,
                price_num: Number(formData.price_num),
                cover_image_url: finalCoverUrl,
                video_sample_url: finalVideoUrl
            };

            console.log('Saving preset payload:', payload);

            if (editingId) {
                const { data, error } = await supabase
                    .from('presets')
                    .update(payload)
                    .eq('id', editingId)
                    .select();
                if (error) {
                    console.log('Update error:', error);
                    throw error;
                }
                console.log('Update success:', data);
            } else {
                const { data, error } = await supabase
                    .from('presets')
                    .insert([payload])
                    .select();
                if (error) {
                    console.log('Insert error:', error);
                    throw error;
                }
                console.log('Insert success:', data);
            }

            handleCloseModal();
            fetchPresets();
        } catch (err) {
            console.log('handleSubmit caught error:', err);
            alert(err.message || 'An error occurred during save.');
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this preset?')) {
            try {
                // 1. Fetch the preset to get file URLs
                const { data: preset, error: fetchError } = await supabase
                    .from('presets')
                    .select('cover_image_url, video_sample_url')
                    .eq('id', id)
                    .single();

                if (fetchError) throw fetchError;

                // 2. Delete files from storage if they exist
                const filesToDelete = [];
                const extractPath = (url) => {
                    if (!url) return null;
                    const parts = url.split('/presets/');
                    return parts.length > 1 ? parts[1] : null;
                };

                const coverPath = extractPath(preset?.cover_image_url);
                const videoPath = extractPath(preset?.video_sample_url);

                if (coverPath) filesToDelete.push(coverPath);
                if (videoPath) filesToDelete.push(videoPath);

                if (filesToDelete.length > 0) {
                    const { error: storageError } = await supabase.storage
                        .from('presets')
                        .remove(filesToDelete);
                    if (storageError) console.error('Error deleting files:', storageError);
                }

                // 3. Delete the database record
                const { error: deleteError } = await supabase
                    .from('presets')
                    .delete()
                    .eq('id', id);

                if (deleteError) throw deleteError;

                fetchPresets();
            } catch (err) {
                alert(err.message || 'Error deleting preset.');
            }
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem' }}>Presets Manager</h1>
                <button
                    onClick={() => handleOpenModal()}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1.5rem', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    <Plus size={18} /> Add New Preset
                </button>
            </div>

            {/* Presets Table */}
            <div style={{ background: '#121212', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        <tr>
                            <th style={{ padding: '1.2rem 1.5rem', color: '#a0a0a0', fontWeight: 'normal', fontSize: '0.9rem' }}>Image</th>
                            <th style={{ padding: '1.2rem 1.5rem', color: '#a0a0a0', fontWeight: 'normal', fontSize: '0.9rem' }}>Title</th>
                            <th style={{ padding: '1.2rem 1.5rem', color: '#a0a0a0', fontWeight: 'normal', fontSize: '0.9rem' }}>Price</th>
                            <th style={{ padding: '1.2rem 1.5rem', color: '#a0a0a0', fontWeight: 'normal', fontSize: '0.9rem' }}>Status</th>
                            <th style={{ padding: '1.2rem 1.5rem', color: '#a0a0a0', fontWeight: 'normal', fontSize: '0.9rem', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="5" style={{ padding: '2rem', textAlign: 'center' }}>Loading...</td></tr>
                        ) : presets.length === 0 ? (
                            <tr><td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: '#a0a0a0' }}>No presets found. Add one above.</td></tr>
                        ) : (
                            presets.map(preset => (
                                <tr key={preset.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <td style={{ padding: '1rem 1.5rem' }}>
                                        {preset.cover_image_url ? (
                                            <img src={preset.cover_image_url} alt="Cover" style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px', background: '#333' }} />
                                        ) : (
                                            <div style={{ width: '60px', height: '40px', background: '#333', borderRadius: '4px' }}></div>
                                        )}
                                    </td>
                                    <td style={{ padding: '1rem 1.5rem', fontWeight: '500' }}>{preset.title}</td>
                                    <td style={{ padding: '1rem 1.5rem', color: '#0070f3' }}>${preset.price_num}</td>
                                    <td style={{ padding: '1rem 1.5rem' }}>
                                        {preset.is_active ?
                                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: '#00a45e', fontSize: '0.85rem', background: 'rgba(0,164,94,0.1)', padding: '0.2rem 0.6rem', borderRadius: '12px' }}><Check size={14} /> Active</span> :
                                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: '#a0a0a0', fontSize: '0.85rem', background: 'rgba(255,255,255,0.1)', padding: '0.2rem 0.6rem', borderRadius: '12px' }}>Inactive</span>
                                        }
                                    </td>
                                    <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                            <button onClick={() => handleOpenModal(preset)} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer' }}><Edit2 size={16} /></button>
                                            <button onClick={() => handleDelete(preset.id)} style={{ background: 'rgba(255,77,77,0.1)', border: 'none', color: '#ff4d4d', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer' }}><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal Form */}
            {isModalOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
                    <div style={{ background: '#121212', padding: '2rem', borderRadius: '12px', width: '100%', maxWidth: '600px', border: '1px solid rgba(255,255,255,0.1)', maxHeight: '90vh', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.5rem' }}>{editingId ? 'Edit Preset' : 'Add New Preset'}</h2>
                            <button onClick={handleCloseModal} style={{ background: 'none', border: 'none', color: '#a0a0a0', cursor: 'pointer' }}><X size={24} /></button>
                        </div>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            <div>
                                <label style={labelStyle}>Title</label>
                                <input type="text" name="title" value={formData.title} onChange={handleChange} required style={inputStyle} placeholder="e.g. Cinematic Blue for S-Log" />
                            </div>

                            <div>
                                <label style={labelStyle}>Description (Vibe/Colors)</label>
                                <textarea name="description" value={formData.description} onChange={handleChange} required style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }} placeholder="Describe the vibe..."></textarea>
                            </div>

                            <div>
                                <label style={labelStyle}>Price (Numbers only, e.g. 25)</label>
                                <input type="number" step="0.01" name="price_num" value={formData.price_num} onChange={handleChange} required style={inputStyle} placeholder="25.00" />
                            </div>

                            <div>
                                <label style={labelStyle}>Cover Image (Required)</label>
                                <input type="file" accept=".jpg,.jpeg,.png" onChange={(e) => handleFileChange(e, 'cover')} style={inputStyle} />
                                {coverPreview && (
                                    <div style={{ marginTop: '0.5rem' }}>
                                        <img src={coverPreview} alt="Preview" style={{ width: '120px', height: '80px', objectFit: 'cover', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)' }} />
                                    </div>
                                )}
                            </div>

                            <div>
                                <label style={labelStyle}>Video Sample (Optional)</label>
                                <input type="file" accept=".mp4,.mov" onChange={(e) => handleFileChange(e, 'video')} style={inputStyle} />
                                {videoPreview && (
                                    <div style={{ marginTop: '0.5rem' }}>
                                        <video src={videoPreview} muted loop playsInline style={{ width: '120px', height: '80px', objectFit: 'cover', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)' }} />
                                    </div>
                                )}
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                                <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} id="isActive" style={{ width: '18px', height: '18px' }} />
                                <label htmlFor="isActive" style={{ cursor: 'pointer' }}>Active (Visible on website)</label>
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <button type="button" onClick={handleCloseModal} disabled={uploading} style={{ flex: 1, padding: '1rem', background: 'transparent', border: '1px solid #a0a0a0', color: '#fff', borderRadius: '4px', cursor: uploading ? 'not-allowed' : 'pointer' }}>Cancel</button>
                                <button type="submit" disabled={uploading} style={{ flex: 1, padding: '1rem', background: '#0070f3', border: 'none', color: '#fff', borderRadius: '4px', cursor: uploading ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}>
                                    {uploading ? 'Uploading...' : editingId ? 'Update Preset' : 'Save Preset'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const labelStyle = { display: 'block', marginBottom: '0.5rem', color: '#a0a0a0', fontSize: '0.9rem' };
const inputStyle = { width: '100%', padding: '0.8rem', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontFamily: 'inherit' };

export default PresetsManager;
