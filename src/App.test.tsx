import { act, cleanup, fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { afterEach, describe, expect, test, vi } from 'vitest'
import App from './App'

describe('Mamma Pizza Menu Browser', () => {
  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

  test('opens on Pizza with Margherita as Featured Dish', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'Margherita' })).toBeVisible()
    expect(screen.getByText('Pizza')).toBeVisible()
    expect(screen.getByText('Tomato, fior di latte, basil')).toBeVisible()
    expect(screen.getByText('€12')).toBeVisible()
    expect(screen.getByText('Per serving')).toBeVisible()
  })

  test('switches Category through Story Circles and starts at first Story', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: 'View Pasta menu' }))

    expect(screen.getByRole('heading', { name: 'Cacio e Pepe' })).toBeVisible()
    expect(screen.getByText('Pasta')).toBeVisible()
    expect(screen.getByRole('region', { name: 'Pasta story 1 of 3' })).toBeVisible()
  })

  test('browses Stories manually and respects sequence boundaries', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: 'Next story' }))
    expect(screen.getByRole('heading', { name: 'Piccante' })).toBeVisible()

    fireEvent.click(screen.getByRole('button', { name: 'Previous story' }))
    expect(screen.getByRole('heading', { name: 'Margherita' })).toBeVisible()

    fireEvent.click(screen.getByRole('button', { name: 'Previous story' }))
    expect(screen.getByRole('heading', { name: 'Margherita' })).toBeVisible()
  })

  test('advances after six seconds and stops on final Story', () => {
    vi.useFakeTimers()
    render(<App />)

    act(() => {
      vi.advanceTimersByTime(6000)
    })
    expect(screen.getByRole('heading', { name: 'Piccante' })).toBeVisible()

    act(() => {
      vi.advanceTimersByTime(12000)
    })
    expect(screen.getByRole('heading', { name: 'Ortolana' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Play story playback' })).toBeVisible()
  })

  test('pauses and resumes automatic playback with top-right control', () => {
    vi.useFakeTimers()
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: 'Pause story playback' }))
    act(() => {
      vi.advanceTimersByTime(6000)
    })
    expect(screen.getByRole('heading', { name: 'Margherita' })).toBeVisible()

    fireEvent.click(screen.getByRole('button', { name: 'Play story playback' }))
    act(() => {
      vi.advanceTimersByTime(6000)
    })
    expect(screen.getByRole('heading', { name: 'Piccante' })).toBeVisible()
  })

  test('pauses automatic playback while touch is held', () => {
    vi.useFakeTimers()
    render(<App />)

    fireEvent.touchStart(screen.getByRole('region', { name: 'Pizza story 1 of 3' }))
    act(() => {
      vi.advanceTimersByTime(6000)
    })
    expect(screen.getByRole('heading', { name: 'Margherita' })).toBeVisible()

    fireEvent.touchEnd(screen.getByRole('region', { name: 'Pizza story 1 of 3' }))
    act(() => {
      vi.advanceTimersByTime(6000)
    })
    expect(screen.getByRole('heading', { name: 'Piccante' })).toBeVisible()
  })
})
