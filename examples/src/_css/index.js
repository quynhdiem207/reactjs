import Button from './Button'
import GlobalStyles from './GlobalStyles'

function App() {
    return (
        <GlobalStyles>
            <div style={{ padding: '10px 32px' }}>
                <Button />
                <Button primary disabled />
            </div>
        </GlobalStyles>
    )
}

export default App