import axios from 'axios';

class MdService {
    static getIntroMarkdown() {
        return axios.get("https://github.com/tipbk/sneakfeed-client/blob/homepage-md/Homepage.md");
    }
}

export default MdService;