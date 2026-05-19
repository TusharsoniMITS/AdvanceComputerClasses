import React, { useState, useEffect } from 'react'
import axios from 'axios'

function EditEnglishText() {
    const [texts, setTexts] = useState([])

    useEffect(() => {
        fetchTexts()
    }, [])

    const fetchTexts = async () => {
        try {
            const res = await axios.get('/api/getAllText')
            console.log("Fetched Data 👉", res.data.allMessage)
            setTexts(res.data.allMessage)
        } catch (err) {
            console.log(err)
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/DeleteText/${id}`)
            fetchTexts()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ textAlign: 'center' }}>Edit English Text</h2>

            {texts.length === 0 ? (
                <p style={{ textAlign: 'center' }}>No text found.</p>
            ) : (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '15px'
                }}>
                    {texts.map((text) => (
                        <div key={text._id} style={{
                            border: '1px solid #ddd',
                            borderRadius: '10px',
                            padding: '15px',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                            backgroundColor: '#fafafa',
                            fontSize: '14px',
                            height: '300px',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}>
                            <div style={{ overflowY: 'auto' }}>
                                <p style={{ whiteSpace: 'pre-wrap' }}>{text.text}</p>
                            </div>
                            <div>
                                <small style={{ color: 'gray' }}>Created At: {new Date(text.createdAt).toLocaleString()}</small><br />
                                <button
                                    onClick={() => handleDelete(text._id)}
                                    style={{
                                        marginTop: '10px',
                                        padding: '5px 10px',
                                        backgroundColor: '#e74c3c',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default EditEnglishText
