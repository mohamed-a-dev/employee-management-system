import httpStatusCodes from "../utils/status-codes.js";

export default class Forbidden extends Error{
    constructor(msg){
        super(msg);
        this.statusCode = httpStatusCodes.FORBIDDEN
    }
}