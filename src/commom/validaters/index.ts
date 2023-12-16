const validadorCPF = (cpf: any) => {
    // inicia as variaveis que serão ultilizadas no codigo
    var Soma: any,
        i: any,
        Resto: any,
        CPF = cpf;
    // pega o cpf informado e retira os '.' e o  '-' para fazer a verificação
    CPF = String(
        CPF.replace("-", "")
            .replace(".", "")
            .replace(/[^0-9]/g, "")
    );
    Soma = 0;
    // verifica se os caracteres são todos iguais
    if (
        CPF.length !== 11 ||
        !Array.from(CPF).filter((e) => e !== CPF[0]).length
    ) {
        CPF = false;
        return CPF;
    }
    //faz o calculo de verificação de todos os digitos para verificar se o CPF é valido
    for (i = 1; i <= 9; i++)
        Soma = Soma + parseInt(CPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;
    if (Resto === 10 || Resto === 11) Resto = 0;
    if (Resto != parseInt(CPF.substring(9, 10))) {
        CPF = false;
        return CPF;
    }
    Soma = 0;
    for (i = 1; i <= 10; i++)
        Soma = Soma + parseInt(CPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;
    if (Resto === 10 || Resto === 11) Resto = 0;
    if (Resto !== parseInt(CPF.substring(10, 11))) {
        CPF = false;
        return CPF;
    }
    CPF = true;
    return CPF;
};


export { validadorCPF };
