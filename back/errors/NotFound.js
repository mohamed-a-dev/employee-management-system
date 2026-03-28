import httpStatusCodes from "../utils/status-codes.js";

export default class NotFound extends Error{
    constructor (message){
        super(message);
        this.statusCode = httpStatusCodes.NOT_FOUND;
    }
}