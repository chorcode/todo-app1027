import { fetchSampleTodos } from './api'

beforeEach(() => {
  global.fetch = jest.fn()
})

test('成功したら title だけの配列を返す', async () => {
  fetch.mockResolvedValue({
    ok: true,
    json: async () => [
      { id: 1, title: 'delectus aut autem', completed: false },
      { id: 2, title: 'quis ut nam facilis', completed: true },
    ],
  })
  const result = await fetchSampleTodos()
  expect(result).toEqual(['delectus aut autem', 'quis ut nam facilis'])
  expect(fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/todos?_limit=3')
})

test('サーバがエラーを返したら例外を投げる', async () => {
  fetch.mockResolvedValue({ ok: false, status: 500 })
  await expect(fetchSampleTodos()).rejects.toThrow('HTTP 500')
})
