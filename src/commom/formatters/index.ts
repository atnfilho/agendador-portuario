const formataDataPadraoBR = (value: string) => {
    const dataArray = value.split(" ");
    const data = dataArray[0];
    const hora = dataArray[1];
    const dataBR = data.split("-").reverse().join("/");
    return `${dataBR} ${hora}`;
}


export { formataDataPadraoBR };
