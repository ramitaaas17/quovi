import React, { forwardRef } from 'react';
// Componente de entrada reutilizable

const Input = forwardRef(({
    type = 'text', // Tipo de entrada: text, password, email, etc.
    placeholder, // Texto de marcador de posición
    value, // Valor de la entrada
    onChange, // Función que se ejecuta al cambiar el valor
    error, // Mensaje de error para mostrar
    label, // Etiqueta del campo
    className = '', // Clases CSS adicionales
    ...props
}, ref) => {
    return(
        <div className="w-full">
            {label &&(
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <input
                ref={ref}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`
                    w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600
                    bg-white dark:bg-gray-800 
                    text-gray-900 dark:text-white
                    placeholder-gray-500 dark:placeholder-gray-400
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    transition-all duration-200
                    ${error ? 'border-red-500 focus:ring-red-500' : ''}
                    ${className}
                `}
                {...props}
            />
            {error && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {error}
                </p>
            )}
        </div>
    );
});
Input.displayName = 'Input'; // Nombre del componente para depuración  
export default Input

