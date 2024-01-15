export const cpfMask = (value: string) => {
    if (!value) return;
    const noMask = value.replace(/\D/g, '');
    return noMask.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
}

export const cnpjMask = (value: string) => {
    if (!value) return;
    const noMask = value.replace(/\D/g, '');
    return noMask.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '$1.$2.$3/$4-$5');
}

export const cepMask = (value: string) => {
    if (!value) return;
    const noMask = value.replace(/\D/g, '');
    return noMask.replace(/(\d{2})(\d{3})(\d{3})/g, '$1.$2-$3');
}