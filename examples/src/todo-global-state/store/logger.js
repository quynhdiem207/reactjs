function logger(reducer) {
    return (prevState, action) => {
        console.group(action.type)
        console.log('Action: ', action)
        console.log('Prev state: ', prevState)

        const nextState = reducer(prevState, action)

        console.log('Next state: ', nextState)
        console.groupEnd()

        return nextState
    }
}

export default logger