import u from './Uploader.module.css'

const Uploader = (props) => {
    return(
        <div className={u.uploader}>
            <div className={u.header}>
                <h4>загрузки</h4>
                <button>X</button>
            </div>

        </div>
    )
}
export default Uploader