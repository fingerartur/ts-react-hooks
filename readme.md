# React hooks

Some useful react hooks

## useOnEventOutside
```typescript
const Screen = () => {
    const ref = useRef<HTMLDivElement>(null)

    useOnEventOutside('click', ref, () => {
        // clicked on an element which is not the div with text `Hello`
        // or it's descendant
    })

    return <div>
        <div></div>
        <div ref={ref}>Hello</div>
    </div>
}
```

## useOnGlobalEvent
```typescript
const Screen = () => {
    const ref = useRef<HTMLDivElement>(null)

    useOnGlobalEvent('click', () => {
        // clicked anywhere in the DOM
    })

    return <div>Hello</div>
}
```
