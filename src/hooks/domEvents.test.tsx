import React, { useRef } from 'react'
import { render, screen } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import userEvents from '@testing-library/user-event'

import { useOnEventOutside, useOnGlobalEvent } from './domEvents'

describe('dom events', () => {
    it('can listen to global events', () => {
        const onClick = jest.fn()

        renderHook(() => {
            useOnGlobalEvent('click', onClick)
        })

        expect(onClick).toBeCalledTimes(0)

        userEvents.click(document.body)
        userEvents.click(document.body)
        userEvents.click(document.body)

        expect(onClick).toBeCalledTimes(3)

        userEvents.hover(document.body)

        expect(onClick).toBeCalledTimes(3)

        userEvents.dblClick(document.body)

        expect(onClick).toBeCalledTimes(5)
    })

    it('can listen events outside of some element', () => {
        const onClick = jest.fn()

        const Screen = () => {
            const ref = useRef<HTMLDivElement>(null)

            useOnEventOutside('click', ref, onClick)

            return <div data-testid="1">
                <div data-testid="2"></div>
                <div data-testid="3" ref={ref}></div>
            </div>
        }

        render(<Screen />)

        expect(onClick).toBeCalledTimes(0)

        screen.getByTestId("3").click()
        screen.getByTestId("3").click()

        expect(onClick).toBeCalledTimes(0)

        screen.getByTestId("2").click()

        expect(onClick).toBeCalledTimes(1)

        screen.getByTestId("1").click()

        expect(onClick).toBeCalledTimes(2)
    })
})


