import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TodoApp from './TodoApp'

beforeEach(() => {
  localStorage.clear()
})

test('TODO を追加・完了・削除できる', async () => {
  const user = userEvent.setup()
  render(<TodoApp />)
  const input = screen.getByRole('textbox', { name: 'やること' })
  // 追加
  await user.type(input, '牛乳を買う{Enter}')
  await user.type(input, 'レポート提出{Enter}')
  expect(screen.getAllByRole('listitem')).toHaveLength(2)
  expect(screen.getByText(/残り\s*2\s*件/)).toBeInTheDocument()

  // 完了
  await user.click(screen.getByRole('checkbox', { name: '牛乳を買う' }))
  expect(screen.getByText(/残り\s*1\s*件/)).toBeInTheDocument()
  // 削除
  await user.click(screen.getByRole('button', { name: 'レポート提出を削除' }))
  expect(screen.queryByText('レポート提出')).not.toBeInTheDocument()
  expect(screen.getAllByRole('listitem')).toHaveLength(1)
})

test('localStorage に保存された TODO が最初から表示される', () => {
  localStorage.setItem('todos', JSON.stringify([{ id: '1', text: '保存済みの TODO', done: true }]))
  render(<TodoApp />)
  expect(screen.getByRole('checkbox', { name: '保存済みの TODO' })).toBeChecked()
  expect(screen.getByText(/残り\s*0\s*件/)).toBeInTheDocument()
})
