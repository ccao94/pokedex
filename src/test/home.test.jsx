import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import Home from '../pages/Home'
import { vi } from 'vitest'
import { searchPokemon } from '../api/pokemon'

// Mock is used to not really call the api
vi.mock('../api/pokemon', () => ({
  searchPokemon: vi.fn()
}))

const renderWithRouter = (component) => {
    return render(<BrowserRouter>{component}</BrowserRouter>)
  }

  describe('Home', () => {

    test('Using search bar for pikachu', async () => {
      searchPokemon.mockResolvedValue({ name: 'pikachu', id: 25,   types: [{ type: { name: 'electric' } } ]
      })

      renderWithRouter(<Home />)
      const user = userEvent.setup()

      // Simulate the user writing pikachu and enter
      const input = screen.getByPlaceholderText(/search/i)
      await user.type(input, 'pikachu{enter}')

      await waitFor(() => {
        expect(searchPokemon).toHaveBeenCalledWith('pikachu')
      })

      const pokemonName = await screen.findByText(/pikachu/i)
      expect(pokemonName).toBeInTheDocument()

    })
  })
