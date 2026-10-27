import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { fetchSampleTodos } from '@/lib/api'
import SampleLoader from './SampleLoader'

jest.mock('@/lib/api')

test('読み込みに成功したら、取得した文字で onLoad が呼ばれる', async () => {
  const user = userEvent.setup()
  fetchSampleTodos.mockResolvedValue(['サンプル1', 'サンプル2'])
  const handleLoad = jest.fn()
  render(<SampleLoader onLoad={handleLoad} />)
  await user.click(screen.getByRole('button', { name: 'サンプルを読み込む' }))
  expect(handleLoad).toHaveBeenCalledWith(['サンプル1', 'サンプル2'])
})

test('読み込みに失敗したらエラーメッセージを表示する', async () => {
  const user = userEvent.setup()
  fetchSampleTodos.mockRejectedValue(new Error('HTTP 500'))
  render(<SampleLoader onLoad={jest.fn()} />)
  await user.click(screen.getByRole('button', { name: 'サンプルを読み込む' }))
  expect(await screen.findByRole('alert')).toHaveTextContent('読み込みに失敗しました')
})
