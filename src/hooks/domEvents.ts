import { useEffect, useCallback } from 'react'

import type { RefObject } from 'react'

type EventName = keyof DocumentEventMap

export const useOnEventOutside = (
    event: EventName,
    elementRef: RefObject<HTMLElement|null>,
    callback: (e: Event) => any
) => {
    const handle = useCallback((e: Event) => {
        if (elementRef.current == null) {
            return
        }

        if (elementRef.current.contains(e.target as Node)) {
            // event inside element
            return
        }

        callback(e)
    }, [callback])

    useEffect(() => {
        document.addEventListener(event, handle)

        return () => {
            document.removeEventListener(event, handle)
        }
    }, [callback])
}

export const useOnGlobalEvent = (
    event: EventName,
    callback: (e: Event) => any
) => {
    useEffect(() => {
        document.addEventListener(event, callback)

        return () => {
            document.removeEventListener(event, callback)
        }
    }, [callback])
}
