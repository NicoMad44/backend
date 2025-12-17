const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = async (req, res, next) => {
  try {
    if (!req.file) return next();

    const inputPath = req.file.path;
    const extlessName = path.parse(req.file.filename).name;
    const outputPath = path.join('images', extlessName + '.webp');

    await sharp(inputPath)
      .resize(800)              
      .webp({ quality: 75 })    
      .toFile(outputPath);

    // supprimer l’original
    fs.unlinkSync(inputPath);

    // mettre à jour les infos du fichier pour le controller
    req.file.filename = extlessName + '.webp';
    req.file.path = outputPath;
    req.file.mimetype = 'image/webp';

    next();
  } catch (error) {
    next(error);
  }
};