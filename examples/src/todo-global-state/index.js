import Component from './App-2'
import { StoreProvider } from './store'

function App() {
    return (
        <StoreProvider>
            <Component />
        </StoreProvider>
    )
}

export default App