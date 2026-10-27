'use client'

import { useState } from 'react'
import { fetchSampleTodos } from '@/lib/api'

export default function SampleLoader({ onLoad }) {
  const [status, setStatus] = useState('idle')
  async function handleClick() {
    setStatus('loading')
    try {
      const texts = await fetchSampleTodos()
      onLoad(texts)
      setStatus('idle')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div>
      <button onClick={handleClick} disabled={status === 'loading'}>
        サンプルを読み込む
      </button>
      {status === 'loading' && <p>読み込み中…</p>}
      {status === 'error' && <p role="alert">読み込みに失敗しました</p>}
    </div>
  )
}
