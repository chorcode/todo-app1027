'use client'

import { useState } from 'react'

export default function TodoForm({ onAdd }) {
  const [text, setText] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = text.trim()
    if (trimmed === '') {
      setError('やることを入力してください')
      return
    }
    onAdd(trimmed)
    setText('')
    setError('')
  }

  function handleChange(e) {
    setText(e.target.value)
    if (error) setError('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="やることを入力"
        aria-label="やること"
      />
      <button type="submit">追加</button>
      {/* role="alert" を付けたエラー表示部分 */}
      {error && <p role="alert">{error}</p>}
    </form>
  )
}
