export const formataDataHoraPadraoBR = (value: string) => {
    const dataArray = value.split(" ");
    const data = dataArray[0];
    const hora = dataArray[1];
    const dataBR = data.split("-").reverse().join("/");
    return `${dataBR} ${hora}`;
}

export const formataDataPadraoBR = (value: string) => {

    if(!value) return;

    const dataBR = value.split("-").reverse().join("/");
    return dataBR;
}

export const onlyNumbers = (value: string) => {
    return value.replace(/\D/g, '');
}
