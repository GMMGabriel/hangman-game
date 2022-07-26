import { FormEvent, useState } from 'react'

import { createCode } from '../hooks/useRandomCode'

import { Button } from '../components/Button'

import '../styles/new-room.scss'

export function NewRoom() {
  const [keyword, setKeyword] = useState('')
  const [hint, setHint] = useState('')

  async function handleCreateRoom(e: FormEvent){
    e.preventDefault()
    alert(createCode())
  }

  return (
    <div id="page-new-room">
      <main>
        <h1>Configurações da sala</h1>
        <form onSubmit={handleCreateRoom}>
          <div className="fields">
            <label htmlFor="keyword" className="d-block">Palavra-chave: *</label>
            <input
              type="text"
              name="keyword"
              id="keyword"
              value={keyword}
              onChange={event => setKeyword(event.target.value.toUpperCase())}
              required
            />
          </div>
          <div className="fields">
            <label htmlFor="hint" className="d-block">Defina a dica:</label>
            <input
              type="text"
              name="hint"
              value={hint}
              onChange={event => setHint(event.target.value)}
              id="hint"
            />
          </div>
          <div className="actions">
            <Button type="submit" disabled={keyword.trim() === ''}>Criar sala</Button>
          </div>
        </form>
      </main>
    </div>
  )
}