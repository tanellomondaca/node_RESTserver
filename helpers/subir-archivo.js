const { v4: uuidv4 } = require('uuid');
const path = require('path');

const subirArchivo = (files, extensionesValidas = ['png','jpg','jpeg','gif','pdf'], carpeta = '') => {
    

    return new Promise((resolve, reject ) => {

        const { archivo } = files;
    
        // Nombre del archivo - extensiones permitidas
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length-1]
    
        // Validar extension 
        if(!extensionesValidas.includes(extension)){
            return reject(`La extension ${extension} no es permitida`);
        }
    
        //Ubicar y nombrar
        const nombreTemp = uuidv4()+'.'+extension;
        const uploadPath = path.join(__dirname, "../uploads/", carpeta , nombreTemp);
    
        archivo.mv(uploadPath, function (err) {
            if (err) {
                return reject(err)
            }
    
            resolve(uploadPath)
        });

    });

};

module.exports = {
    subirArchivo
}
