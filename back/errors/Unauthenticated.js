import httpStatusCodes from "../utils/status-codes.js";

export default class Unauthenticated extends Error{
    constructor (msg){
        super(msg);
        this.statusCode = httpStatusCodes.UNAUTHORIZED;
    }
}