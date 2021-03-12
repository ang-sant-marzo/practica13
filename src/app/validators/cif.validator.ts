import { AbstractControl } from '@angular/forms';

const letrasCif = ['a','b','c','d'];

export function ValidateCif (control: AbstractControl) {

    if(control.value === null) {
        return null;
    } 

    let isValidLetra = false;

    letrasCif.forEach(letra => {
        if(control.value.toLowerCase().startsWith(letra)) {
            isValidLetra = true;
        }
    })

    if (!isValidLetra) {
        return { invalidCif: true, mensaje: 'El CIF debe comenzar por A, B, C o D'}
    } else if (control.value.length !== 9) {
        return { invalidCif: true, mensaje: 'El CIF debe tener 9 caracteres'}
    }

    return null;

}