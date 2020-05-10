function generateCode () {
    const caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ2346789";
    let generate = "";
    for (let i = 0; i < 20; i++) generate += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    return generate
}

export {
    generateCode
}