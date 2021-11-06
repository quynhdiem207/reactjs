import Component from './App'
import { StoreProvider } from './store'

function App() {
    return (
        <StoreProvider>
            <Component />
        </StoreProvider>
    )
}

export default App