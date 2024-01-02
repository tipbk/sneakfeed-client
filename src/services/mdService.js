import axios from 'axios';

class MdService {
    static getIntroMarkdown() {
        return axios.get("https://raw.githubusercontent.com/tipbk/sneakfeed-service/main/README.md");
    }
}

export default MdService;