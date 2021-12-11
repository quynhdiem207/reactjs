import styles from './Paragraph.module.css'

function Paragraph() {
    console.log(styles);
    return (
        <p className={styles.paragraph}>
            Waiting for update signal from WDS...
        </p>
    )
}

export default Paragraph