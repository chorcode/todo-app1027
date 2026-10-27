const SAMPLE_URL = 'https://jsonplaceholder.typicode.com/todos?_limit=3'

export async function fetchSampleTodos() {
  const res = await fetch(SAMPLE_URL)
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`)
  }
  const data = await res.json()
  return data.map((item) => item.title)
}
