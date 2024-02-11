"use client";
import React from 'react'

export default function Register() {
    async function handleSubmitResgister(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const response = await fetch('/api/users/register', {
            method: 'POST',
            body: formData
        })
        const data = await response.json()
        console.log(data)
    }
  return (
    <div>
        <form onSubmit={handleSubmitResgister}>
            <input className="border border-gray-600" name="name" placeholder='name'/>
            <input className="border border-gray-600" name="email" type="email" placeholder='email'/>
            <input className="border border-gray-600" name="password" type="password" placeholder='password'/>
            <button className="bg-blue-600 rounded-lg p-3 text-white">Register</button>
        </form>
    </div>
  )
}
