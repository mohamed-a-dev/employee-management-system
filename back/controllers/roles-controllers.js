import RolesCollection from '../models/role-model.js'
import httpStatusCodes from '../utils/status-codes.js';

const getRoles = async (req, res) => {
    const roles = await RolesCollection.find().select('-permissions._id');
    res.status(httpStatusCodes.OK).json({ success: true, roles });
}

const createRole = async (req, res) => {
    const role = await RolesCollection.create(req.body);
    const roleObj = role.toObject();
    delete roleObj.permissions._id;

    res.status(httpStatusCodes.CREATED).json({ success: true, role:roleObj });
}

const deleteRole = async (req, res) => {
    const { roleId } = req.params;
    const role = await RolesCollection.findOneAndDelete({ _id: roleId });
    res.status(httpStatusCodes.OK).json({ success: true, role });
}


const editRole = async (req, res) => {
    const { roleId } = req.params;
    const role = await RolesCollection.findOneAndUpdate({ _id: roleId }, req.body, { new: true, runValidators: true }).select('-permissions._id');
    res.status(httpStatusCodes.OK).json({ success: true, role });
}


export { getRoles, createRole, deleteRole, editRole };