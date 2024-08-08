import axios from 'axios'

const instance =axios.create({
    baseURL:'http://localhost:5000' //proxy설정과 동일하게 baseURL(기본URL) 값 설정
})
export default instance;