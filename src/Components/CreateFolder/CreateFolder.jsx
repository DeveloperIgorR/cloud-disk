import folderIcon from '../../Asets/Images/fxemoji_filefolder.png'
import fileIcon from '../../Asets/Images/flat-color-icons_file.png'
import avaIcon from '../../Asets/Images/carbon_user-avatar-filled.png'
import c from './CreateFolder.module.css'
import { useContext, useState } from 'react'
import FileService from '../../API/FileService/FileService'
import { AuthContext } from '../../context'
import Alert from '../UI/Alert/Alert'

const CreateFolder = (props) => {

    const [newFolder, setNewFolder] = useState('')
    const [newFiles, setNewFiles] = useState(null)
    const [newAva, setNewAva] = useState(null)
    const { user, setUser } = useContext(AuthContext)
    const { download, setDownload } = useContext(AuthContext)
    const { alert, setAlert } = useContext(AuthContext)

    async function setFolder() {
        props.setFetching(true)
        setDownload(true)
        try {
           
            const uploadFile = {name:newFolder, progress: 0 }           
            function onUploadProgress(progressEvent) {
                const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                if (totalLength) {
                    uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength)
                    props.setDownloadsFiles(prev => [...prev, uploadFile])
                }
            }

            const response = await FileService.setFiles(newFolder, props.parentDir,onUploadProgress)
            props.setActiveChild(false)
            console.log(response.data)
            props.addNewFile(response.data)
            props.setDownloadsFiles([...props.downloadsFiles, response.data])
            setNewFolder('')

        } catch (e) {
            if(e) {setAlert(true)}
            <Alert>
               {e}
            </Alert>
        } finally {
            props.setFetching(false)
        }

    }
    function uploadFile() {
        for (let i = 0; i < newFiles.length; i++) {
            const file = newFiles[i]
            setFile(file)
        }
    }

    async function setFile(file) {
        props.setFetching(true)
        props.setActiveChild(false)
        setDownload(true)
        try {
            const formData = new FormData()
            formData.append('file', file)
            if (props.parentDir) {
                formData.append('parent', props.parentDir)
            }

            const uploadFile = { name: file.name, progress: 0 }
            function onUploadProgress(progressEvent) {
                const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                if (totalLength) {
                    uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength)
                    props.setDownloadsFiles(prev => [...prev, uploadFile])
                }
            }
            const response = await FileService.uploadFile(formData, onUploadProgress)
            props.addFormData(response.data)

        } catch (e) {
            if(e) {setAlert(true)}
            <Alert>
               {e}
            </Alert>
        } finally {
            props.setFetching(false)
        }

    }

    async function setAva() {
        props.setFetching(true)
        setDownload(true)
        try {
            const formData = new FormData()
            if (newAva) {
                formData.append('file', newAva)
            }
            if (props.parentDir) {
                formData.append('parent', props.parentDir)
            }

            const uploadFile = { name: newAva.name, progress: 0 }
            function onUploadProgress(progressEvent) {
                const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                if (totalLength) {
                    uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength)
                    props.setDownloadsFiles(prev => [...prev, uploadFile])
                }
            }
            const response = await FileService.uploadAva(formData,onUploadProgress)
            setUser(response.data)
            console.log(user)
            props.setActiveChild(false)

        } catch (e) {
            if(e) {setAlert(true)}
            <Alert>
               {e}
            </Alert>
        } finally {
            props.setFetching(false)
        }
    }

    return (

        <div >
            <div className={c.type}>
                <div>
                    <img src={folderIcon} />
                    <input type='dir' value={newFolder} onChange={event => setNewFolder(event.target.value)} placeholder='введите название папки' />
                    <button onClick={setFolder} >Создать</button>
                </div>
                <div>
                    <img src={fileIcon} />
                    <input multiple={true} type='file' onChange={event => setNewFiles(event.target.files)} placeholder='введите название файла' />
                    <button onClick={uploadFile} >Загрузить</button>

                </div>
                <div>
                    <img src={avaIcon} />
                    <input type='file' onChange={event => setNewAva(event.target.files[0])} />
                    <button onClick={setAva} >Загрузить аватар</button>
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}

export default CreateFolder