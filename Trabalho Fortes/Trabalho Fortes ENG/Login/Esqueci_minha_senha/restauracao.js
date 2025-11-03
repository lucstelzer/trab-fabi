// Continuação em server.js

// 2. Rota para redefinir a senha
app.post('/api/reset-password', (req, res) => {
    const { token, newPassword } = req.body;
    
    // ATENÇÃO: Em produção, NUNCA armazene a senha pura. 
    // Use uma função de hash (ex: bcrypt) para armazenar a senha de forma segura!
    
    let userFound = null;
    let emailFound = null;

    // Busca o usuário pelo token
    for (const email in users) {
        if (users[email].passwordResetToken === token) {
            userFound = users[email];
            emailFound = email;
            break;
        }
    }

    if (!userFound || userFound.tokenExpiry < Date.now()) {
        return res.status(400).json({ message: 'O link de redefinição é inválido ou expirou.' });
    }
    
    // A senha é atualizada
    // Em uma aplicação real, aqui você usaria userFound.password = hash(newPassword)
    console.log(`Senha do usuário ${emailFound} foi redefinida para: ${newPassword}`);
    
    // Invalida o token para uso único
    userFound.passwordResetToken = null;
    userFound.tokenExpiry = null;
    
    res.status(200).json({ message: 'Sua senha foi redefinida com sucesso! Você já pode fazer login.' });
});
