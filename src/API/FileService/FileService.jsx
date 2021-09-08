import { instance } from "../instance"

export default class FileService {

    static async receiveFiles(parent){
        return instance.get('files', {
            params: {
                parent
            }
        })   
    }

    static async deleteFiles(id){
        return  instance.delete('files',{
            params: {
                id
            }                                
        }) 

    }

    static async setFiles(name, parent){
        return instance.post('files',{
            name, parent
        })
    }

    static async uploadFile(formData){
        return instance.post('files/upload',formData)
    }

    static async uploadAva(formData){
        return instance.post('files/avatar',formData)
    }

}