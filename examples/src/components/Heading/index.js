import styles from './Heading.module.css'

function Heading() {
    console.log(styles);
    return (
        <h1
            className={styles.heading}
            id={styles.test}
        >
            Hello everybody!
        </h1>
    )
}

export default Heading