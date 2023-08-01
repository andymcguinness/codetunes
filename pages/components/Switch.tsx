import React, { ChangeEventHandler, ReactElement } from 'react'

function Switch({ checked, onChange, label }: { checked: boolean; onChange: ChangeEventHandler<HTMLInputElement>; label: string; }) : ReactElement {

    return (
        <label htmlFor={label} className="flex items-center cursor-pointer">
            <div className="relative">
                <input type="checkbox" id={label} className="peer sr-only" checked={checked} onChange={(e) => onChange(e)} />
                <div className="w-11 h-6 bg-gray-400 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </div>
            <div className="ml-1 text-sky-500 font-medium">{label}</div>
        </label>
    );
}

export default Switch;