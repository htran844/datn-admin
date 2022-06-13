import {Axios} from "./axios";

function postLogin(payLoad){
    return Axios.post('users/login',payLoad);
}

const AccountService = {
    postLogin,
};

export default AccountService;