const validarArchivo = (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).json({msg: "No files were uploaded."});
        return;
    }
    if (!req.files.archivo) {
        res.status(400).json({msg: "No files were uploaded."});
        return;
    }

    next();
}

module.exports = {
    validarArchivo
}