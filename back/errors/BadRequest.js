import httpStatusCodes from "../utils/status-codes.js";

export default class BadRequest extends Error{
    constructor(msg){
        super(msg);
        this.statusCode = httpStatusCodes.BAD_REQUEST
    }
}