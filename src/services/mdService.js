import axios from 'axios';

class MdService {
    static getIntroMarkdown() {
        return axios.get("https://raw.githubusercontent.com/tipbk/sneakfeed-client/homepage-md/Homepage.md");
    }
}

export default MdService;