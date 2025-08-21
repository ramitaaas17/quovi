import React from 'react';

// Componente de botón reutilizable
const Button = ({
    children,      // Contenido que irá dentro del botón (texto, iconos, etc)
    onClick,       // Función que se ejecuta al hacer click en el botón
    type = 'button',   // Tipo de botón: 'button', 'submit', etc.
    variant = 'primary', // Variante visual del botón: primary, secondary, outline, ghost
    size = 'medium',    // Tamaño del botón: small, medium, large
    disabled = false,   // Si el botón está deshabilitado
    className = '',     // Clases CSS adicionales
    ...props            // Otros props adicionales que se quieran pasar
}) => {
    // Clases base que siempre se aplican al botón
    const baseClasses = `
        inline-flex items-center justify-center font-medium rounded-lg
        transition-all duration-200 transform active:scale-95
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    `;

    // Diferentes estilos según la variante elegida
    const variants = {
        primary: `
            bg-blue-600 hover:bg-blue-700 text-white
            focus:ring-blue-500 shadow-lg hover:shadow-xl
            border border-blue-600 hover:border-blue-700
        `,
        secondary: `
            bg-gray-100 hover:bg-gray-200 text-gray-900
            dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white
            focus:ring-gray-500 border border-gray-300 dark:border-gray-600
        `,
        outline: `
            bg-transparent border-2 border-blue-600 text-blue-600
            hover:bg-blue-600 hover:text-white
            dark:border-blue-400 dark:text-blue-400
            focus:ring-blue-500
        `,
        ghost: `
            bg-transparent hover:bg-gray-100 text-gray-700
            dark:hover:bg-gray-800 dark:text-gray-300
            focus:ring-gray-500
        `
    };

    // Tamaños disponibles para el botón
    const sizes = {
        small: 'px-3 py-1.5 text-sm',   // Botón pequeño
        medium: 'px-4 py-2 text-base',  // Botón mediano
        large: 'px-5 py-3 text-lg'      // Botón grande
    };

    // Renderiza el botón
    return (
        <button
            type={type} // Tipo de botón
            onClick={onClick} // Evento click
            disabled={disabled || props.loading} // Deshabilita si está en loading o disabled
            className={`
                ${baseClasses}
                ${variants[variant]}
                ${sizes[size]}
                ${className}
            `}
            {...props} // Otros props adicionales
        >
            {/* Si está en loading, muestra un spinner animado */}
            {props.loading && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}
            {/* Contenido del botón */}
            {children}
        </button>
    );
};

export default Button;